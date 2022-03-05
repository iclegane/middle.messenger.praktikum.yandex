import {ProfilePage} from "../../../blocks/ProfilePage";
import {renderDOM} from "../../../utils/renderDOM";


document.addEventListener('DOMContentLoaded', () => {
    const page = new ProfilePage({
        title: 'Изменить пароль',
        body: {
            form: {
                inputs: [{
                        name: 'oldPassword',
                        type: 'password',
                        display_name: 'Пароль',
                        pattern: '',
                        value: '12345',
                        required: true,
                    }, {
                        name: 'newPassword',
                        type: 'password',
                        display_name: 'Новый пароль',
                        pattern: '',
                        value: '12345678910',
                        required: true,
                    }],
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