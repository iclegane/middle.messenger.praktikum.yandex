import Block from "../../utils/Block";

import { IFormPage } from "./types";


export class FormPage extends Block {
    constructor({title, form}: IFormPage) {
        super({
            title,
            form,
        });
    }

    protected render(): string {

        //language=hbs
        return `
            <div class="window">
                <div class="title">{{title}}</div>
                {{{Form inputs=form.inputs button=form.button link=form.link}}}
            </div>
        `
    }
}