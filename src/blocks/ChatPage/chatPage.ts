import Block from "../../utils/Block";
import Link from "../../components/Link";
import Input from "../../components/Input";
import Messages from "../../components/Messages";
import ActionList from "../../components/ActionList";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import { IChatPage } from "./types";
import { registerComponent } from "../../utils/registerComponent";


export class ChatPage extends Block {
    constructor({navigation, search, messages, footer_actions, header_actions, dialog}: IChatPage) {
        super({
            navigation,
            search,
            messages,
            footer_actions,
            header_actions,
            dialog
        });
    }

    protected render(): string {
        registerComponent(Messages);
        registerComponent(ActionList);
        registerComponent(Dialog);
        registerComponent(Input);
        registerComponent(Link);
        registerComponent(Button);

        //language=hbs
        return `
            <div class="messenger">
                <div class="messenger__left-panel">
                    <div class="navigation-panel">
                        {{{Link label=navigation.link.label href=navigation.link.href classes=navigation.link.classes}}}
                    </div>
    
                    <div class="search-panel">
                        {{{Input classes=search.input.classes display_name=search.input.display_name}}}
                    </div>
                    
                    {{{Messages items=messages.items}}}
                </div>
                    <div class="messenger__right-panel">
                        <div class="chat">
                            <div class="chat__header">
                                <div class="chat__user-info">
                                    <div class="chat__user-avatar">
                                        <div class="image image--round image--empty"></div>
                                    </div>
                                    <div class="messages__user-name chat__user-name">Вадим</div>
                                </div>

                                <div class="chat__user-actions">
                                    {{{ActionList label=header_actions.label items=header_actions.items position=header_actions.position}}}
                                </div>
                            </div>
                            <div class="chat__body">
                                {{{Dialog groups=dialog.groups}}}
                            </div>
                            <div class="chat__footer">

                                <div class="attentions">
                                    {{{ActionList label=footer_actions.label items=footer_actions.items position=footer_actions.position}}}
                                </div>
 
                                {{{Input type="text" required=true name="message" classes="chat__input gray-theme-input" display_name="Сообщение"}}}

                                {{{Button type="button" classes="button--blue" name="Отправить"}}}
                            </div>
                        </div>
                    </div>
            </div>
        `;
    }
}