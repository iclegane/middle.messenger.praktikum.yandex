import Block from "../../utils/Block";

export interface ModalProps {
    title: string;
    content: typeof Block;
    onSubmit?: () => void;
}

export class Modal extends Block {

    static get componentName() : string {
        return 'Modal';
    }

    get element() {
        return this._element;
    }

    status: boolean

    protected visibleClass: string = 'modal--visible';
    protected onCloseClass: string = 'modal__close';

    constructor({title, content, onSubmit}: ModalProps) {
        super();

        this.setProps({
            title,
            content,
            onSubmit,
            events: {
                click: (e: MouseEvent) => {
                    const target = e.target as HTMLHtmlElement;

                    if (target.closest('.' + this.onCloseClass)) {
                        this.toggle();
                    }
                }
            }
        })

        this.status = false;
    }

    toggle = () => {

        this.status = !this.status;

        this.toggleClass(this.visibleClass, this.status)
    }

    protected render(): string {

        //language=hbs
        return `
            <div class="modal modal--center">
                <div class="modal__close">
                    <span>закрыть</span>
                </div>
                <div class="modal__header">
                    <div class="modal__title title">{{title}}</div>
                </div>
                <div class="modal__content">
                    {{{Form inputs=content.inputs button=content.button onSubmit=content.onSubmit}}}
                </div>
            </div>
        `
    }
}