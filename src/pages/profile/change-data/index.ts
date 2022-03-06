import { ProfilePage } from "../../../blocks/ProfilePage";
import { renderDOM } from "../../../utils/renderDOM";
import { REGEXP } from "../../../utils/REGEXP";


document.addEventListener('DOMContentLoaded', () => {
    const page = new ProfilePage({
        title: 'Изменить данные',
        header:{
            image: {
                //@ts-ignore
                src : require('/static/images/profile/profile__image--empty.png')
            }
        },
        body: {
            form: {
                inputs: [{
                        name: 'email',
                        type: 'email',
                        display_name: 'Почта',
                        validity: REGEXP['EMAIL'],
                        value: 'pochta@yandex.ru',
                        required: true,
                    }, {
                        name: 'login',
                        type: 'text',
                        display_name: 'Логин',
                        validity: REGEXP['LOGIN'],
                        value: 'ivanivanov',
                        required: true,
                    }, {
                        name: 'first_name',
                        type: 'text',
                        display_name: 'Имя',
                        validity: REGEXP['NAME'],
                        value: 'Иван',
                        required: true,
                    }, {
                        name: 'second_name',
                        type: 'text',
                        display_name: 'Фамилия',
                        validity: REGEXP['NAME'],
                        value: 'Иванов',
                        required: true,
                    }, {
                        name: 'display_name',
                        type: 'text',
                        display_name: 'Имя в чате',
                        validity: REGEXP['NAME'],
                        value: 'Иван',
                        required: true,
                    }, {
                        name: 'phone',
                        type: 'text',
                        display_name: 'Телефон',
                        validity: REGEXP['PHONE'],
                        value: '+79099673030',
                        required: true,
                    }, {
                        name: 'avatar',
                        type: 'file',
                        display_name: 'Аватар',
                        value: '',
                        required: false,
                    }
                ],
                button: {
                    name: 'Сохранить',
                    type: 'submit',
                    classes: ''
                }
            }
        },
        navigation: {
            label: 'Назад',
            href: '/pages/profile/index.html',
            classes: 'profile-panel__link',
        }
    });

    renderDOM('main', page);
});