import {ProfilePage} from "../../../blocks/ProfilePage";
import {renderDOM} from "../../../utils/renderDOM";


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
                        pattern: '^[a-z0-9_\\-\\.]+@[a-z0-9_\\-]{2,}\\.[a-z0-9_\\-]{2,}$',
                        value: 'pochta@yandex.ru',
                        required: false,
                    }, {
                        name: 'login',
                        type: 'text',
                        display_name: 'Логин',
                        pattern: '^[a-z]{1}[a-z0-9_-]{2,19}$',
                        value: 'ivanivanov',
                        required: false,
                    }, {
                        name: 'first_name',
                        type: 'text',
                        display_name: 'Имя',
                        pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*$',
                        value: 'Иван',
                        required: false,
                    }, {
                        name: 'second_name',
                        type: 'text',
                        display_name: 'Фамилия',
                        pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*$',
                        value: 'Иванов',
                        required: false,
                    }, {
                        name: 'display_name',
                        type: 'text',
                        display_name: 'Имя в чате',
                        pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*$',
                        value: 'Иван',
                        required: false,
                    }, {
                        name: 'phone',
                        type: 'text',
                        display_name: 'Телефон',
                        pattern: '^(\\+?\\d){10,15}$',
                        value: '+79099673030',
                        required: false,
                    }, {
                        name: 'avatar',
                        type: 'file',
                        display_name: 'Аватар',
                        pattern: '',
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