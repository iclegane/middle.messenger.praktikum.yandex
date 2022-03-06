import Block from '../../utils/Block'
import Input from "../Input";
import Link from "../Link";
import Button from "../Button";
import { IFormProps } from "./types";
import { getFormData } from "../../utils/getFormData";
import { registerComponent } from "../../utils/registerComponent";


export class Form extends Block {

    static get componentName() : string {
        return 'Form';
    }

    constructor({inputs, button, link} : IFormProps) {
        super({
            inputs,
            button,
            link,
            events: {
                submit: (e: Event) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const data = getFormData(form);

                    if (form.checkValidity()) {
                        console.log(data)
                    }
                }
            },
        });
    }

    render(){

        registerComponent(Input);
        registerComponent(Button);
        registerComponent(Link);

        //language=hbs
        return `
            <form id="{{_id}}" action="" class="form">
                <div class="form__wrapper">
        
                    {{#each inputs as |input|}}
                        <div class="input-group">
                            <label class="input-group__label" for={{input.name}}>{{input.display_name}}</label>
                            {{{ Input type=input.type name=input.name pattern=input.pattern value=input.value required=input.required  events=../events  }}}
                        </div>
                    {{/each}}

                    <div class="form__controls">
                        {{{Button classes='button--round button--blue' type=button.type name=button.name}}}
                        {{{Link label=link.label href=link.href classes=link.classes}}}
                    </div>
                </div>
            </form>
        `;
    }
}