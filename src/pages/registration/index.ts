import { FormPage } from "../../blocks/FormPage";
import { renderDOM} from "../../utils/renderDOM";
import { REGEXP } from "../../utils/REGEXP";


document.addEventListener('DOMContentLoaded', () => {

    const page = new FormPage({
        title: 'Регистрация',
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
                type:'submit',
                name: 'Зарегистрироваться',
                classes: 'button--round button--blue',
            },
            link: {
                label: 'Войти',
                href: '/pages/login/index.html',
                classes: 'link--blue'
            }
        }
    });

    renderDOM('#root', page);
})