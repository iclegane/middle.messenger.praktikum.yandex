import Block from '../../utils/Block'
import { IButtonProps } from "./types";

export class Button extends Block {

    static get componentName() : string {
        return 'Button';
    }

    constructor({name, onClick, type, classes}: IButtonProps) {
        super({
            name,
            classes,
            type,
            events: {
                click: onClick
            }
        });
    }

    render() {
        //language=hbs
        return `
            <button type="{{type}}" class="button {{classes}}">
                {{ name }}
            </button>
        `;
    }
}