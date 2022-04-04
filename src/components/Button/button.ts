import Block from '../../utils/Block'
import { IButtonProps } from "./types";

export class Button extends Block {

    static get componentName() : string {
        return 'Button';
    }

    constructor({name, onClick, type, classes, data}: IButtonProps) {
        super({
            name,
            classes,
            type,
            data,
            events: {
                click: onClick
            }
        });
    }

    render() {
        //language=hbs
        return `
            <button type="{{type}}" class="button {{classes}}" data-type={{data.type}}>
                {{ name }}
            </button>
        `;
    }
}