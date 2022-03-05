import Block from "../../../../utils/Block";
import {IDialogMessage} from "./types";




export class DialogMessage extends Block {
    constructor({message_type, meta,  delivery_time, status, isOwner, attachments}: IDialogMessage) {
        super({
            message_type,
            delivery_time,
            status,
            isOwner,
            attachments,
            meta
        });
    }

    protected render(): string {
        //language=hbs
        return `
            <div class="message message--{{status}}">
                <div class="message__content message__content--{{message_type}}">
                    <p>
                        {{{attachments.text}}}
                        <span class="message-meta">
                            <span class="message-meta__status message-meta__status--{{meta}}"></span>
                            <span class="message-meta__time">{{delivery_time}}</span>
                        </span>
                    </p>
                </div>
            </div>
        `;
    }
}