import { Block } from '../../modules/Block';
import { IMessagesItem } from './types';
import store from '../../modules/Store/Store';
import { dateFormattedTime } from '../../utils/dateFormatted';

export class MessagesItem extends Block {
  static get componentName() : string {
    return 'MessagesItem';
  }

  constructor(props: IMessagesItem) {
    super();

    this.setProps({
      chatID: props.chatID,
      title: props.title,
      unread_count: props.unread_count,
      last_message: {
        time: props.last_message?.time ? dateFormattedTime(props.last_message.time) : '',
        content: props.last_message?.content,
      },
      is_active: false,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();

          store.set('currentChat', {
            id: props.chatID,
          });
        },
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="messages__item">
                <div class="messages__avatar">
                    <div class="image image--round image--empty"></div>
                </div>
                <div class="messages__info-wrapper">
                    <div class="messages__user-info">
                        <div class="messages__user-name">{{title}}</div>
                        <div class="messages__time">{{last_message.time}}</div>
                    </div>
                    <div class="messages__message-info">
                        <div class="messages__user-message">
                            {{last_message.content}}
                        </div>
                        
                        {{#if unread_count}}
                            <div class="messages__badge">
                                <div class="badge">
                                    <div class="badge__count">{{unread_count}}</div>
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
