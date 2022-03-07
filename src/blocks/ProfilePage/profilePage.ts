import Block from "../../utils/Block";
import Form from "../../components/Form";
import Link from "../../components/Link";
import { IProfileProps } from "./types";
import { registerComponent } from "../../utils/registerComponent";



export class ProfilePage extends Block {
    constructor({title, footer, body, header, navigation}: IProfileProps) {
        super({
            title,
            footer,
            body,
            header,
            navigation
        });
    }

    render() {

        registerComponent(Form);
        registerComponent(Link);

        //language=hbs
        return `
            <div class="profile">
                <div class="profile-information">
                    <div class="profile-information__container">

                        <div class="profile-information__head">
                            {{#if header.image}}
                                <div class="profile-information__avatar-container">
                                    <img src="{{header.image.src}}" width="40px" height="40px" alt="Avatar">
                                </div>
                            {{/if}}
                            <div class="title">{{title}}</div>
                        </div>
                        
                        
                        <div class="profile-information__content">
                            {{#each body.userData as |field|}}
                                <div class="field">
                                    <div class="field__name">{{field.name}}</div>
                                    <div class="field__value">{{field.value}}</div>
                                </div>
                            {{/each}}
                            
                            {{#if body.form}}
                                {{{Form inputs=body.form.inputs button=body.form.button}}}
                            {{/if}}
                        </div>
                        
                        
                        <div class="profile-information__footer">
                            {{#each footer.links as |link|}}
                                <div class="field">
                                    <div class="field__name">
                                        {{{Link label=link.label href=link.href classes=link.classes}}}
                                    </div>
                                </div>
                            {{/each}}
                        </div>
                        
                    </div>
                </div>
                <div class="profile-panel">
                    {{{Link label=navigation.label href=navigation.href classes=navigation.classes}}}
                </div>
            </div>
        `;
    }
}