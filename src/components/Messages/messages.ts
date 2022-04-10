import { Block } from '../../modules/Block';
import { IMessages } from './types';

export class Messages extends Block {
  static get componentName() : string {
    return 'Messages';
  }

  constructor({ items } : IMessages) {
    super({
      items,
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="messages">
                <div class="messages__overlay"> 
                    {{#each items as |item|}}
                        {{{MessagesItem chatID=item.chatID title=item.title unread_count=item.unread_count last_message=item.last_message}}}
                    {{/each}}
                </div>
            </div>
        `;
  }
}
