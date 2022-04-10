import { Block } from '../../modules/Block';
import { IDialogMessage } from './types';

export class DialogMessage extends Block {
  static get componentName() : string {
    return 'DialogMessage';
  }

  constructor(data: IDialogMessage) {
    super(data);

    this.setProps({
      status: data.is_owner ? 'send' : 'received',
      meta: data.is_read ? 'read' : 'unread',
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="message message--{{status}}">
                <div class="message__content message__content--text">
                    <p>
                        {{{content}}}
                        <span class="message-meta">
                            <span class="message-meta__status message-meta__status--{{meta}}"></span>
                            <span class="message-meta__time">{{time}}</span>
                        </span>
                    </p>
                </div>
            </div>
        `;
  }
}
