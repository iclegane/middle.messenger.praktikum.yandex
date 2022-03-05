import {FormPage} from "../../blocks/FormPage";
import {renderDOM} from "../../utils/renderDOM";


document.addEventListener('DOMContentLoaded', () => {

    const page = new FormPage({
        title: 'Авторизация',
        form: {
            inputs: [
                {
                    name: 'login',
                    type: 'text',
                    display_name: 'Логин',
                    pattern: '^[a-z]{1}[a-z0-9_-]{2,19}$',
                    value: '',
                    required: true,
                }, {
                    name: 'password',
                    type: 'password',
                    display_name: 'Пароль',
                    pattern: '^(?=.*[A-ZА-Я])(?=.*\\d).{8,40}$',
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