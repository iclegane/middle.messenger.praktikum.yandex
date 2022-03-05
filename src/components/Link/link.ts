import Block from '../../utils/Block'
import {ILinkProps} from "./types";


export class Link extends Block {
    constructor({label, href, classes} : ILinkProps) {
        super({label, href, classes});
    }

    render() {
        //language=hbs
        return `
            <a class="link {{classes}}" href="{{href}}">
                {{label}}
            </a>
        `;
    }
}
