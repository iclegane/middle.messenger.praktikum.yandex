import Block from '../../utils/Block'
import {getFormData} from "../../utils/getFormData";
import {IFormProps} from "./types";

export class Form extends Block {
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