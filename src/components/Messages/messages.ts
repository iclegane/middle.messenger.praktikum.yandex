import Block from "../../utils/Block";
import MessagesItem from "./components/messagesItem";
import { IMessages } from "./types";
import { registerComponent } from "../../utils/registerComponent";



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

        registerComponent(MessagesItem)

        //language=hbs
        return `
            <div class="messages">
                {{#each items as |item|}}
                    {{{MessagesItem name=item.name avatar=item.avatar message=item.message}}}
                {{/each}}
            </div>
        `;
    }
}