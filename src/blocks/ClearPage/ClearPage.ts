import Block from "../../utils/Block";
import { registerComponent } from "../../utils/registerComponent";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export class ClearPage extends Block {

    constructor() {
        super();

        this.setProps({
            title: 'test',
            form: {
                inputs:[{
                    type: 'text',
                    display_name: 'login',
                    name: 'test',
                    required: false,
                }],
                button: {
                    name: 'Отправить',
                    type: 'submit'
                }
            },
            click: this.open.bind(this),
        })
    }

    open() {

        for (const key in this.children) {

            const child = this.children[key];
            const childName = child.constructor.name;

            if (childName === 'Modal') {
                //@ts-ignore
                child.toggle();
            }

        }
    }

    render() {

        registerComponent(Modal);
        registerComponent(Button);

        //language=hbs
        return `
           <div style="position:relative;width: 100%;height: 100%;">
               
               {{{Button name='test' type='button' onClick=click}}}
               
               {{{Modal title=title content=form}}}
           </div>
        `;
    }
}