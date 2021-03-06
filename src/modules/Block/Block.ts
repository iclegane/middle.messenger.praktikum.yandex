import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import { EventBus } from '../EventBus';
import { isEqual } from '../../utils/isEqual';

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static get componentName() : string {
    return 'Block';
  }

  public id = nanoid(6);

  protected _element: HTMLElement | null = null;

  protected props: any;

  protected state: any = {};

  protected children: Record<string, Block>;

  private eventBus: () => EventBus;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this.initChildren();

    this.props = this._makePropsProxy({ ...props, _id: this.id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  protected initChildren() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps : any, newProps : any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps : any, newProps : any) {
    return !isEqual(newProps, oldProps);
  }

  getProps = () => this.props;

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  private _render() {
    this.children = {};

    const templateString = this.render();

    const fragment = this.compile(templateString, { ...this.props });

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._clearElement();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render() : string {
    return '';
  }

  getContent(): HTMLElement {
    // ??????, ?????????? ?????????????? CDM ???????????? ?????????? ???????????????????? ?? DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  protected getChildren(propsAndChildren: any) {
    const children : any = {};
    const props: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => (v instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _makePropsProxy(props: any) {
    // ?????????? ?? ?????? ???????????????? this
    // ?????????? ???????????? ???????????? ???? ?????????????????????? ?? ???????????????? ES6+
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target : Record<string, unknown>, prop : string) {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target : Record<string, unknown>, prop : string, value : unknown) {
        const oldProps = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('?????? ??????????????');
      },
    });
  }

  private _createDocumentElement(tagName : string) : HTMLElement {
    // ?????????? ?????????????? ??????????, ?????????????? ?????????? ?????????????????? ?? ?????????? ?????????????? ?????????? ?????????????????? ????????????
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
            // @ts-ignore
            this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
            // @ts-ignore
            this._element!.addEventListener(event, listener);
    });
  }

  protected compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const template = Handlebars.compile(templateString);

    const htmlString = template({ ...context, children: this.children });

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  private _clearElement() {
        this._element!.innerHTML = '';
  }

  protected toggleClass(className: string, add: boolean) {
        this._element!.classList.toggle(className, add);
  }

  show() {
        this._element!.classList.remove('hidden');
  }

  hide() {
        this._element!.classList.add('hidden');
  }
}

export default Block;
