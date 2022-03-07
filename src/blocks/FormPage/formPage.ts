import Block from "../../utils/Block";
import Form from "../../components/Form";
import { IFormPage } from "./types";
import { registerComponent } from "../../utils/registerComponent";


export class FormPage extends Block {
    constructor({title, form}: IFormPage) {
        super({
            title,
            form,
        });
    }

    protected render(): string {

        registerComponent(Form);

        //language=hbs
        return `
            <div class="window">
                <div class="title">{{title}}</div>
                {{{Form inputs=form.inputs button=form.button link=form.link}}}
            </div>
        `
    }
}