import EventBus from "./EventBus";
import { nanoid } from 'nanoid'
import * as Handlebars from "handlebars";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
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

        const {props, children} = this.getChildren(propsAndChildren);

        this.children = children;

        this.initChildren();

        this.props = this._makePropsProxy({ ...props, _id: this.id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
         if (this.componentDidUpdate(oldProps, newProps)) {
             this._removeEvents()
             this._clearElement()
             this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
         }
    }

    //@ts-ignore
    componentDidUpdate(oldProps : any, newProps : any) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const templateString  = this.render();

        const fragment = this.compile(templateString, {...this.props});

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents()
    }

    protected render() : string {
        return  '';
    }

    getContent() : HTMLElement | null {
        return this.element;
    }

    protected getChildren(propsAndChildren: any) {
        const children : any = {};
        const props: any = {};

        Object.entries(propsAndChildren).map(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if(Array.isArray(value) && value.every(v => (v instanceof Block))) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        })

        return {props, children};
    }

    private _makePropsProxy(props: any) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target : Record<string, unknown>, prop : string) {
                const value = target[prop];

                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target : Record<string, unknown>, prop : string, value : unknown) {
                const oldProps = {...target};

                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private _createDocumentElement(tagName : string) : HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if(!events || !this._element) {
            return
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        })
    }
    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if(!events) {
            return
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        })
    }

    protected compile(templateString: string, context: any) {
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;


        const template = Handlebars.compile(templateString);

        const htmlString = template({...context, children: this.children});

        fragment.innerHTML = htmlString;
        //@ts-ignore
        Object.entries(this.children).forEach(([key, child]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`)

            if(!stub) {
                return
            }

            stub.replaceWith(child.getContent()!);
        })


        return fragment.content;
    }

    private _clearElement() {
        this._element!.innerHTML = ''
    }

    toggleClass(className: string, add: boolean) {
        this._element!.classList.toggle(className, add)
    }

    show() {
        this._element!.classList.remove('hidden')
    }

    hide() {
        this._element!.classList.add('hidden')
    }


}

export default Block