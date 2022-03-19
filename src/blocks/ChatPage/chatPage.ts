import Block from "../../utils/Block";
import Link from "../../components/Link";
import Input from "../../components/Input";
import Messages from "../../components/Messages";
import ActionList from "../../components/ActionList";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import Modal from "../../components/Modal";

// import { IChatPage } from "./types";

import { registerComponent } from "../../utils/registerComponent";
import {isEqual} from "../../utils/isEqual";

import {createChatFrom} from "./types";
import store from "../../modules/Store/Store";

import ChatController from "../../controllers/ChatController";
import UserController from "../../controllers/UserController";
import AuthController from "../../controllers/AuthController";


export class ChatPage extends Block {
    constructor(props: any) {

        super({...props});


        const userHeaderActionList = {
            label: 'Настройки чатов',
            items: [
                {
                    label: 'Создать новый чат',
                    data: {
                        type: 'createChat'
                    },
                    onClick: this.handlerUserActions.bind(this),
                },
                {
                    label: 'Добавить пользователя',
                    data: {
                        type: 'addUser'
                    },
                    onClick: this.handlerUserActions.bind(this),
                },
                {
                    label: 'Удалить пользователя',
                    data: {
                        type: 'removeUser'
                    },
                    onClick: this.handlerUserActions.bind(this),
                }
            ]
        }

        const userFooterActionList = {
            label: 'Вложения',
            items: [
                {
                    label: 'Фото или Видео',
                },{
                    label: 'Файл',
                },{
                    label: 'Локация',
                },]
        }

        this.setProps({
            user: {},
            chats: {
                items: [],
            },
            currentChat: {
                id: null,
            },
            // display_name: '',
            // avatar_src: '',
            header_actions: userHeaderActionList,
            footer_actions: userFooterActionList,
            // modal: {},
        })
    }

    async componentDidMount() {
        await AuthController.getUser();
        await ChatController.getChats();

        // this.setProps({
        //     user,
        //     chats
        // })

        console.log(this.props)
    }


    protected _chooseChatByID(id: number) {
        const chats = store.getState().chats;

        const currentChat = chats?.items.filter((element) => element.chatID === id)[0];


        if (currentChat) {
            this.setProps({
                display_name: currentChat.name,
                avatar_src: currentChat.avatar.src,
            })
        }
    }

    protected handlerUserActions(e: MouseEvent) {
        const target = e.currentTarget as HTMLInputElement;

        const actionType = target.getAttribute('data-type');

        if(!actionType){
            return
        }

        if (actionType === 'createChat') {
            this.setProps({
                modal: {
                    title: 'Добавить чат',
                    form: {
                        inputs: [{
                            type: 'text',
                            display_name: 'Название чата',
                            name: 'chatTitle',
                            required: true,
                        }],
                        button: {
                            name: 'Создать',
                            type: 'submit'
                        },
                        onSubmit: this._createChat.bind(this),
                    }
                }
            })
        }

        if (actionType === 'addUser') {
            this.setProps({
                modal: {
                    title: 'Добавить пользователя',
                    form: {
                        inputs: [{
                            type: 'text',
                            display_name: 'login',
                            name: 'login',
                            required: true,
                        }],
                        button: {
                            name: 'Отправить',
                            type: 'submit'
                        },
                        onSubmit: this._addUserToChat.bind(this),
                    }
                }
            })
        }

        if (actionType === 'removeUser') {
            this.setProps({
                modal: {
                    title: 'Удалить пользователя',
                    form: {
                        inputs: [{
                            type: 'text',
                            display_name: 'login',
                            name: 'login',
                            required: true,
                        }],
                        button: {
                            name: 'Отправить',
                            type: 'submit'
                        },
                        onSubmit: this._deleteUserFromChat.bind(this),
                    }
                }
            })
        }

        this.toggleModal();

    }

    async _addUserToChat() {
        const data = store.getState();

        if (!(data.user?.id && data.currentChat?.id)) {
            throw new Error('user id ')
        }

        await ChatController.addUserToChat({
            users: [data.user?.id],
            chatId: data.currentChat?.id,
        })
    }

    async _deleteUserFromChat() {
        const data = store.getState();

        if (!(data.user?.id && data.currentChat?.id)) {
            throw new Error('user id ')
        }

        await ChatController.deleteUserFromChat({
            users: [data.user?.id],
            chatId: data.currentChat?.id,
        })
    }

    async _createChat(data: createChatFrom) {
        await ChatController.createChat({
            title: data.chatTitle
        })
    }





    componentDidUpdate(oldProps: any, newProps: any): boolean {


        if (oldProps.currentChat && newProps.currentChat) {
            if (oldProps.currentChat.id !== newProps.currentChat.id) {
                if (Number.isInteger(newProps.currentChat.id)) {
                    this._chooseChatByID(newProps.currentChat.id);
                }
            }
        }

        console.log(oldProps.chats)


        // if (oldProps.currentChat !== newProps.currentChat) {
        //     console.log('test')
        //     if (Number.isInteger(newProps.currentChat.id)) {
        //
        //         this._chooseChatByID(newProps.currentChat.id);
        //     }
        // }

        return !isEqual(newProps, oldProps)
    }

    protected toggleModal() {

        for (const key in this.children) {

            const child = this.children[key];
            const childName = child.constructor.name;

            if (childName === 'Modal') {
                //@ts-ignore
                child.toggle();
            }

        }
    }


    protected render(): string {
        registerComponent(Messages);
        registerComponent(ActionList);
        registerComponent(Dialog);
        registerComponent(Input);
        registerComponent(Link);
        registerComponent(Button);
        registerComponent(Modal);

        //language=hbs
        return `
            <div class="messenger">
                <div class="messenger__left-panel">
                    <div class="navigation-panel">
                        {{{Link label='Профиль' href='/settings' classes='navigation-panel__link'}}}
                    </div>
    
                    <div class="search-panel">
                        {{{Input classes='gray-theme-input' display_name='Поиск'}}}
                    </div>
                    
                    {{{Messages items=chats.items}}}
                </div>
                <div class="messenger__right-panel">
                        <div class="chat chat--empty">
                            <div class="chat__header">
                                <div class="chat__user-info">
                                    <div class="chat__user-avatar">
                                        
                                        {{#if avatar_src.src}}
                                            <div class="image image--round" style="background-url:({{avatar_src.src}})"></div>
                                        {{else}}
                                            <div class="image image--round image--empty"></div>
                                        {{/if}}
                                    </div>
                                    <div class="messages__user-name chat__user-name">{{display_name}}</div>
                                </div>

                                <div class="chat__user-actions">
                                    {{{ActionList label=header_actions.label items=header_actions.items position='bottom'}}}
                                </div>
                            </div>
                            <div class="chat__body">
                                {{{Dialog groups=dialog.groups}}}
                            </div>
                            <div class="chat__footer">

                                <div class="attentions">
                                    {{{ActionList label=footer_actions.label items=footer_actions.items position='top'}}}
                                </div>
 
                                {{{Input type="text" required=true name="message" classes="chat__input gray-theme-input" display_name="Сообщение"}}}

                                {{{Button type="button" classes="button--blue" name="Отправить"}}}
                            </div>
                        </div>
                    </div>
                {{{Modal title=modal.title content=modal.form}}}
            </div>
        `;
    }
}