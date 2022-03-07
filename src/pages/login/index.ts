import { FormPage } from "../../blocks/FormPage";
import { renderDOM } from "../../utils/renderDOM";
import { REGEXP } from "../../utils/REGEXP";

document.addEventListener('DOMContentLoaded', () => {

    const page = new FormPage({
        title: 'Авторизация',
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
                href: '/pages/registration/index.html',
                classes: 'link--blue',
            }
        }
    });

    renderDOM('#root', page);
});