import {FormPage} from "../../blocks/FormPage";
import {renderDOM} from "../../utils/renderDOM";


document.addEventListener('DOMContentLoaded', () => {

    const page = new FormPage({
        title: 'Регистрация',
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
                    name: 'first_name',
                    type: 'text',
                    display_name: 'Имя',
                    pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*$',
                    value: '',
                    required: true,
                }, {
                    name: 'second_name',
                    type: 'text',
                    display_name: 'Фамилия',
                    pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*$',
                    value: '',
                    required: true,
                }, {
                    name: 'email',
                    type: 'email',
                    display_name: 'Почта',
                    pattern: '^[a-z0-9_\\-\\.]+@[a-z0-9_\\-]{2,}\\.[a-z0-9_\\-]{2,}$',
                    value: '',
                    required: true,
                }, {
                    name: 'phone',
                    type: 'text',
                    display_name: 'Телефон',
                    pattern: '^(\\+?\\d){10,15}$',
                    value: '',
                    required: true,
                }, {
                    name: 'password',
                    type: 'password',
                    display_name: 'Пароль',
                    pattern: '^(?=.*[A-ZА-Я])(?=.*\\d).{8,40}$',
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