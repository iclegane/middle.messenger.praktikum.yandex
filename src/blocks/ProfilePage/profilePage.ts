import Block from "../../utils/Block";
import Form from "../../components/Form";
import Link from "../../components/Link";
import Button from "../../components/Button";

//@ts-ignore
import { IProfileProps } from "./types";
import { registerComponent } from "../../utils/registerComponent";
import {User} from "../../modules/Store/types";
import UserController from "../../controllers/UserController";
import AuthController from "../../controllers/AuthController";
import {Router} from "../../modules/Router/Router";
import {REGEXP} from "../../utils/REGEXP";

import {UserUpdateData} from "../../api/UserAPI";



export interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}


export class ProfilePage extends Block {

    private user: User;

    constructor(props: User) {
        super(props);
        this.user = props

        this.setProfileContent();
    }

    getUserDataByProps(data: User) {
        const {id, avatar, ...userData} = data;

        return userData;
    }

    setProfileContent() {

        const content = {
            title: this.user.display_name || this.user.first_name,
            header: {
                image: {
                    //@ts-ignore
                    src: 'https://ya-praktikum.tech/api/v2/resources' + this.user.avatar || require('/static/images/profile/profile__image--empty.png')
                }
            },
            body: {
                userData: this.getUserDataByProps(this.user)
            },
            footer: {
                buttons: [{
                    name: 'Изменить данные',
                    type: 'button',
                    classes: 'button--link link--blue',
                    onClick: this.setUserSettings.bind(this),
                }, {
                    name: 'Изменить аватар',
                    type: 'button',
                    classes: 'button--link link--blue',
                    onClick: this.setAvatarSettings.bind(this),
                }, {
                    name: 'Изменить пароль',
                    type: 'button',
                    classes: 'button--link link--blue',
                    onClick: this.setPasswordSettings.bind(this)
                }, {
                    name: 'Выйти',
                    type: 'button',
                    classes: 'button--link link--red',
                    onClick: this.logOut.bind(this)
                }]
            },
            navigation: {
                link: {
                    label: 'Назад',
                    href: '/messenger',
                    classes: 'profile-panel__link',
                }
            }
        }

        this.setProps(content);
    }

    setUserSettings() {
        const content = {
            title: 'Изменить данные',
            header: {},
            body: {
                form: {
                    inputs: [{
                        name: 'email',
                        type: 'email',
                        display_name: 'Почта',
                        validity: REGEXP['EMAIL'],
                        value: this.user.email,
                        required: true,
                    }, {
                        name: 'login',
                        type: 'text',
                        display_name: 'Логин',
                        validity: REGEXP['LOGIN'],
                        value: this.user.login,
                        required: true,
                    }, {
                        name: 'first_name',
                        type: 'text',
                        display_name: 'Имя',
                        validity: REGEXP['NAME'],
                        value: this.user.first_name,
                        required: true,
                    }, {
                        name: 'second_name',
                        type: 'text',
                        display_name: 'Фамилия',
                        validity: REGEXP['NAME'],
                        value: this.user.second_name,
                        required: true,
                    }, {
                        name: 'display_name',
                        type: 'text',
                        display_name: 'Имя в чате',
                        validity: REGEXP['NAME'],
                        value: this.user.display_name,
                        required: true,
                    }, {
                        name: 'phone',
                        type: 'text',
                        display_name: 'Телефон',
                        validity: REGEXP['PHONE'],
                        value: this.user.phone,
                        required: true,
                    }],
                    button: {
                        name: 'Сохранить',
                        type: 'submit',
                        classes: ''
                    },
                    onSubmit: this.onChangeInfoData.bind(this)
                }
            },
            footer: {},
            navigation: {
                link: {},
                button:{
                    name: 'Назад',
                    type: 'button',
                    classes: 'button--link link--gray',
                    onClick: this.setProfileContent.bind(this),
                }
            }
        }

        this.setProps(content);
    }

    setAvatarSettings() {
        const content = {
            title: 'Изменить аватар',
            header: {},
            body: {
                form: {
                    inputs: [{
                        name: 'avatar',
                        type: 'file',
                        display_name: 'Аватар',
                        accept: 'image/*',
                        required: true,
                    }],
                    button: {
                        name: 'Сохранить',
                        type: 'submit',
                        classes: ''
                    },
                    onSubmit: this.onChangeAvatarData.bind(this)
                }
            },
            footer: {},
            navigation: {
                link: {},
                button:{
                    name: 'Назад',
                    type: 'button',
                    classes: 'button--link link--gray',
                    onClick: this.setProfileContent.bind(this),
                }
            }
        }

        this.setProps(content);
    }

    setPasswordSettings() {
        const content = {
            title: 'Изменить пароль',
            header: {},
            body: {
                form: {
                    inputs: [{
                        name: 'oldPassword',
                        type: 'password',
                        display_name: 'Старый пароль',
                        value: '',
                        required: true,
                    }, {
                        name: 'newPassword',
                        type: 'password',
                        display_name: 'Новый пароль',
                        value: '',
                        required: true,
                    }, {
                        name: 'repeatNewPassword',
                        type: 'password',
                        display_name: 'Повторите новый пароль',
                        value: '',
                        required: true,
                    }],
                    button: {
                        name: 'Сохранить',
                        type: 'submit',
                        classes: ''
                    },
                    onSubmit: this.onChangePasswordData.bind(this)
                }
            },
            footer: {},
            navigation: {
                link:{},
                button:{
                    name: 'Назад',
                    type: 'button',
                    classes: 'button--link link--gray',
                    onClick: this.setProfileContent.bind(this),
                },
            }
        }

        this.setProps(content);
    }

    async onChangePasswordData(data: ChangePasswordForm) {
        await UserController.updatePassword(data);
    }

    async onChangeAvatarData(file: Record<string, File>) {
        const user = await UserController.updateAvatar(file.avatar);

        //@ts-ignore
        this.user = user;
        this.setProfileContent()
    }

    async onChangeInfoData(data: UserUpdateData) {

        const user =  await UserController.updateUser(data)

        //@ts-ignore
        this.user = user;
        this.setProfileContent()
    }

    async logOut() {
        try {
            await AuthController.logOut();

            const router = new Router('#app');

            router.go('/signIn')

        } catch (e) {
            console.log('profile logOut error', e);
        }

    }

    render() {

        registerComponent(Form);
        registerComponent(Link);
        registerComponent(Button);

        //language=hbs
        return `
            <div class="profile">
                <div class="profile-information">
                    <div class="profile-information__container">

                        <div class="profile-information__head">
                            {{#if header.image}}
                                <div class="profile-information__avatar-container">
                                    <img src="{{header.image.src}}" width="40px" height="40px" alt="Avatar">
                                </div>
                            {{/if}}
                            <div class="title">{{title}}</div>
                        </div>
                        
                        <div class="profile-information__content">
                            {{#if body.userData}}
                                <div class="field">
                                    <div class="field__name">Логин</div>
                                    <div class="field__value">{{body.userData.login}}</div>
                                </div>

                                <div class="field">
                                    <div class="field__name">Имя</div>
                                    <div class="field__value">{{body.userData.first_name}}</div>
                                </div>                                
                                
                                <div class="field">
                                    <div class="field__name">Фамилия</div>
                                    <div class="field__value">{{body.userData.second_name}}</div>
                                </div>                                
                                
                                <div class="field">
                                    <div class="field__name">Отображаемое имя</div>
                                    <div class="field__value">{{body.userData.display_name}}</div>
                                </div>                               
                            
                                <div class="field">
                                    <div class="field__name">Почта</div>
                                    <div class="field__value">{{body.userData.email}}</div>
                                </div>                                
                                
                                <div class="field">
                                    <div class="field__name">Телефон</div>
                                    <div class="field__value">{{body.userData.phone}}</div>
                                </div>
                            {{/if}}
                            
                            {{#if body.form}}
                                {{{Form inputs=body.form.inputs button=body.form.button onSubmit=body.form.onSubmit}}}
                            {{/if}}
                        </div>
                        
                        <div class="profile-information__footer">
                            {{#each footer.links as |link|}}
                                <div class="field">
                                    <div class="field__name">
                                        {{{Link label=link.label href=link.href classes=link.classes}}}
                                    </div>
                                </div>
                            {{/each}}
                            
                            {{#each footer.buttons as |button|}}
                                <div class="field">
                                    <div class="field__name">
                                        {{{Button classes=button.classes name=button.name type=button.type onClick=button.onClick}}}
                                    </div>
                                </div>
                            {{/each}}
                        </div>
                    </div>
                </div>
                <div class="profile-panel">
                    {{#if navigation.link}}
                        {{{Link label=navigation.link.label href=navigation.link.href classes=navigation.link.classes}}}
                    {{/if}}                    
                    
                    {{#if navigation.button}}
                        {{{Button type=navigation.button.type name=navigation.button.name classes=navigation.button.classes onClick=navigation.button.onClick}}}
                    {{/if}}
                     
                </div>
            </div>
        `;
    }
}