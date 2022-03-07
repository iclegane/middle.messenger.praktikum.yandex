import Block from "../../../../utils/Block";
import { IMessagesItem } from "./types";


export class MessagesItem extends Block {

    static get componentName() : string {
        return 'MessagesItem';
    }

    constructor({name, avatar, message} : IMessagesItem) {
        super({
            name,
            avatar,
            message
        });
    }

    protected render(): string {

        //language=hbs
        return `
            <div class="messages__item">
                <div class="messages__avatar">
                    <div class="image image--round image--empty"></div>
                </div>
                <div class="messages__info-wrapper">
                    <div class="messages__user-info">
                        <div class="messages__user-name">{{name}}</div>
                        <div class="messages__time">{{message.delivery_time}}</div>
                    </div>
                    <div class="messages__message-info">
                        <div class="messages__user-message">
                            {{message.preview_text}}
                        </div>
                        
                        {{#if message.notification.count}}
                            <div class="messages__badge">
                                <div class="badge">
                                    <div class="badge__count">{{message.notification.count}}</div>
                                </div>
                            </div>
                        {{else}}
                            <div class="messages__badge messages__badge--empty">
                                <div class="badge">
                                    <div class="badge__count"></div>
                                </div>
                            </div>
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}