import Block from "../../utils/Block";
import {IMessages} from "./types";
import {registerComponent} from "../../utils/registerComponent";
import MessagesItem from "./components/messagesItem";


export class Messages extends Block {
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