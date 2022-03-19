import Block from "../../utils/Block";
import Form from "../../components/Form";
import { registerComponent } from "../../utils/registerComponent";
import { REGEXP } from "../../utils/REGEXP";
import {SignUpDate} from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";

export class RegistrationPage extends Block{

    constructor() {
        super();

        this.setProps({
            title : 'Регистрация',
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
                        name: 'first_name',
                        type: 'text',
                        display_name: 'Имя',
                        validity: REGEXP['NAME'],
                        value: '',
                        required: true,
                    }, {
                        name: 'second_name',
                        type: 'text',
                        display_name: 'Фамилия',
                        validity: REGEXP['NAME'],
                        value: '',
                        required: true,
                    }, {
                        name: 'email',
                        type: 'email',
                        display_name: 'Почта',
                        validity: REGEXP['EMAIL'],
                        value: '',
                        required: true,
                    }, {
                        name: 'phone',
                        type: 'text',
                        display_name: 'Телефон',
                        validity: REGEXP['PHONE'],
                        value: '',
                        required: true,
                    }, {
                        name: 'password',
                        type: 'password',
                        display_name: 'Пароль',
                        validity: REGEXP['PASSWORD'],
                        value: '',
                        required: true,
                    },
                ],
                button: {
                    type: 'submit',
                    name: 'Зарегистрироваться',
                    classes: 'button--round button--blue',
                },
                link: {
                    label: 'Войти',
                    href: '/signIn/',
                    classes: 'link--blue',
                }
            },
            onSubmit: this.onSubmit.bind(this)
        })
    }

    onSubmit(data: SignUpDate) {
        AuthController.signUp(data as SignUpDate)
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