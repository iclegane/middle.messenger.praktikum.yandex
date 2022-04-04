import Block from "../../utils/Block";
import { IDialog } from "./types";

export class Dialog extends Block {

    static get componentName() : string {
        return 'Dialog';
    }

    constructor({groups} : IDialog) {
        super({
            groups
        });

        if (groups) {
            let items = groups.map((message) => {
                return {
                    message_type: 'text',
                    attachments: {
                        text: message.content
                    }
                }
            });

            this.setProps({
                groups: [{
                    data: '1',
                    messages: items,
                }]
            })
        }
    }

    protected render(): string {

        //language=hbs
        return `
            <div class="dialog">
                {{#each groups as |group|}}
                    <div class="dialog__group">
                        <div class="messages__time message__time">
                            {{group.date}}
                        </div>
                        
                        {{#each group.messages as |message|}}
                            {{{DialogMessage meta=message.meta message_type=message.message_type delivery_time=message.delivery_time status=message.status isOwner=message.isOwner attachments=message.attachments}}}
                        {{/each}}
                    </div>
                {{/each}}
            </div>
        `;
    }
}