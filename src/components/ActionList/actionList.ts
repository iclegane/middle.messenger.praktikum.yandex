import Block from "../../utils/Block";
import Button from "../Button";
import { IActionList } from "./types";
import { registerComponent } from "../../utils/registerComponent";



export class ActionList extends Block {

    static get componentName() : string {
        return 'ActionList';
    }

    protected actionClass = 'actions-list__hidden-panel--open';

    constructor({label, position, items}: IActionList) {
        super({
            label,
            position,
            items,
            open: () => {
                const hiddenPanel = this.element.querySelector('.actions-list__hidden-panel') as HTMLElement;

                this.toggle(hiddenPanel)
            }
        });
    }

    protected toggle(element: HTMLElement) {
        element!.classList.toggle(this.actionClass)
    }

    get element() {
        return this._element as HTMLInputElement
    }

    protected render(): string {

        registerComponent(Button)

        //language=hbs
        return `
            <div class="actions-list">
 
                {{{Button type="button" name=label onClick=open}}}
                
                <div class="actions-list__hidden-panel actions-list__hidden-panel--{{position}}">
                    <div class="actions-list__items">
                        {{#each items as |item|}}
                            {{{Button type="button" name=item.label classes="actions-list__button"}}}
                        {{/each}}
                    </div>
                </div>
            </div>
        `;
    }
}