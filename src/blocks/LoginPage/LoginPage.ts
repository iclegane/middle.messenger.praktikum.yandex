import Block from "../../utils/Block";
import Form from "../../components/Form";
import { registerComponent } from "../../utils/registerComponent";
import { REGEXP } from "../../utils/REGEXP";
import {SignUpDate} from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";

export class LoginPage extends Block{

    constructor() {
        super();

        this.setProps({
            title : 'Авторизация',
            form: {
                inputs: [
                    {
                        name: 'login',
                        type: 'text',
                        display_name: 'Логин',
                        validity: REGEXP['LOGIN'],
                        value: '',
                        required: true,
                    }, {
                        name: 'password',
                        type: 'password',
                        display_name: 'Пароль',
                        validity: REGEXP['PASSWORD'],
                        value: '',
                        required: true,
                    }
                ],
                button: {
                    type: 'submit',
                    name: 'Войти',
                    classes: 'button--round button--blue',
                },
                link: {
                    label: 'Зарегистрироваться',
                    href: '/registration/',
                    classes: 'link--blue',
                }
            },
            onSubmit: this.onSubmit.bind(this)
        })
    }

    onSubmit(data: SignUpDate) {
        AuthController.signIn(data as SignUpDate)
    }


    protected render(): string {
        registerComponent(Form);

        //language=hbs
        return `
            <div class="window">
                <div class="title">{{title}}</div>
                {{{Form inputs=form.inputs button=form.button link=form.link onSubmit=onSubmit}}}
            </div>
        `;
    }
}