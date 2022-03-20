import Block from "../../utils/Block";

import { IMessages } from "./types";


export class Messages extends Block {

    static get componentName() : string {
        return 'Messages';
    }

    constructor({items} : IMessages) {
        super({
            items
        });
    }

    protected render(): string {

        //language=hbs
        return `
            <div class="messages">
                {{#each items as |item|}}
                    {{{MessagesItem name=item.name avatar=item.avatar message=item.message chatID=item.chatID}}}
                {{/each}}
            </div>
        `;
    }
}