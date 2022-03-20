import Block from "../../utils/Block";
import { IMessagesItem } from "./types";
import store from "../../modules/Store/Store";


export class MessagesItem extends Block {

    static get componentName() : string {
        return 'MessagesItem';
    }

    constructor({chatID, name, avatar, message} : IMessagesItem) {
        super();

        this.setProps({
            chatID,
            name,
            avatar,
            message,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    store.set("currentChat", {
                        id: chatID
                    })

                }
            }
        })
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
 
                        {{#if message.preview_text}}
                            <div class="messages__user-name">{{message.preview_text.user.login}}</div>
                            <div class="messages__time">{{message.delivery_time}}</div>
                        {{else}}
                            <div class="messages__user-name">{{name}}</div>
                            <div class="messages__time">{{message.delivery_time}}</div>
                        {{/if}}
                    </div>
                    <div class="messages__message-info">
                        <div class="messages__user-message">
                            {{#if message.preview_text}}
                                {{message.preview_text.content}}
                            {{/if}}
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