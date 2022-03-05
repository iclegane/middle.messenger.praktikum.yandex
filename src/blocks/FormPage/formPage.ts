import Block from "../../utils/Block";

import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "../../components/Link";
import {IFormPage} from "./types";

import {registerComponent} from "../../utils/registerComponent";




export class FormPage extends Block {
    constructor({title, form}: IFormPage) {
        super({
            title,
            form,
        });
    }

    protected render(): string {

        registerComponent(Form);
        registerComponent(Input);
        registerComponent(Button);
        registerComponent(Link);

        //language=hbs
        return `
            <div class="window">
                <div class="title">{{title}}</div>
                {{{Form inputs=form.inputs button=form.button link=form.link}}}
            </div>
        `
    }
}