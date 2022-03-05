import {ProfilePage} from "../../blocks/ProfilePage";
import {renderDOM} from "../../utils/renderDOM";





document.addEventListener('DOMContentLoaded', () => {

    const page = new ProfilePage({
        title: 'Иван',
        header:{
            image: {
                //@ts-ignore
                src : require('/static/images/profile/profile__image--empty.png')
            }
        },
        body: {
            userData: [
                {name: 'Почта', value: 'pochta@yandex.ru'},
                {name: 'Логин', value: 'ivanivanov'},
                {name: 'Имя', value: 'Иван'},
                {name: 'Фамилия', value: 'Иванов'},
                {name: 'Имя в чате', value: 'Иван'},
                {name: 'Телефон', value: '+7 (909) 967 30 30'}
            ]
        },
        footer: {
            links: [{
                    label: 'Изменить данные',
                    href: '/pages/profile/change-data/index.html',
                    classes: 'link--blue',
                },{
                    label: 'Изменить пароль',
                    href: '/pages/profile/change-password/index.html',
                    classes: 'link--blue',
                },{
                    label: 'Выйти',
                    href: '/',
                    classes: 'link--red',
                },
            ]
        },
        navigation: {
            label: 'Назад',
            href: '/pages/profile/index.html',
            classes: 'profile-panel__link',
        }
    })

    renderDOM('#main', page);
});
