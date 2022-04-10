import { Block } from '../../modules/Block';
import { IDialog } from './types';
import {
  getFormattedDay, getFormattedMonth, getFormattedYear, getMonthByDate,
} from '../../utils/dateFormatted';

export class Dialog extends Block {
  static get componentName() : string {
    return 'Dialog';
  }

  constructor(data : IDialog) {
    super();

    const groups: Record<string, any> = {};
    if (data.messages) {
      data.messages.forEach((message) => {
        const dateConstructor = new Date(message.date.default);
        const year = getFormattedYear(dateConstructor);
        const month = getFormattedMonth(dateConstructor);
        const day = getFormattedDay(dateConstructor);
        const time = '00:00:00';

        const pattern = `${year}-${month}-${day}T${time}`;
        const dateKey = new Date(pattern).getTime();

        if (groups.hasOwnProperty(dateKey)) {
          groups[dateKey].messages.push(message);
        } else {
          groups[dateKey] = {
            time: `${day} ${getMonthByDate(dateConstructor)}`,
            messages: [message],
          };
        }
      });

      this.setProps({
        ...data,
        groups,
      });
    }
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="dialog">
                <div class="dialog__overlay">
                    {{#each groups as |group|}}
                        <div class="dialog__group">
                            <div class="messages__time message__time">
                                {{group.time}}
                            </div>
                            
                            {{#each group.messages as |message|}}
                                {{{DialogMessage content=message.content time=message.date.time is_owner=message.is_owner is_read=message.is_read}}}
                            {{/each}}
                        </div>
                    {{/each}}
                </div>
            </div>
        `;
  }
}
