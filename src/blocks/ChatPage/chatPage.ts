import { Block } from '../../modules/Block';

import { isEqual } from '../../utils/isEqual';

import { createChatFrom } from './types';

import store from '../../modules/Store/Store';
import ChatController from '../../controllers/ChatController';
import UserController from '../../controllers/UserController';
import AuthController from '../../controllers/AuthController';

export class ChatPage extends Block {
  constructor(props: any) {
    super({ ...props });

    const userHeaderActionList = {
      label: 'Настройки чатов',
      items: [
        {
          label: 'Создать новый чат',
          data: {
            type: 'createChat',
          },
          onClick: this.handlerUserActions.bind(this),
        },
        {
          label: 'Добавить пользователя',
          data: {
            type: 'addUser',
          },
          onClick: this.handlerUserActions.bind(this),
        },
        {
          label: 'Удалить пользователя',
          data: {
            type: 'removeUser',
          },
          onClick: this.handlerUserActions.bind(this),
        },
      ],
    };

    const userFooterActionList = {
      label: 'Вложения',
      items: [
        {
          label: 'Фото или Видео',
        },
        {
          label: 'Файл',
        },
        {
          label: 'Локация',
        },
      ],
    };

    const sendForm = {
      inputs: [
        {
          name: 'message',
          type: 'text',
          display_name: 'Введите сообщение',
          value: '',
          required: true,
          classes: 'chat__input gray-theme-input',
        },
      ],
      button: {
        name: 'Отправить',
        classes: 'button--blue',
        type: 'submit',
      },
      onSubmit: this._sendMessage.bind(this),
    };

    this.setProps({
      user: {},
      token: {
        value: null,
      },
      chats: {
        items: [],
      },
      currentChat: {
        id: null,
        messages: [],
      },
      display_name: null,
      avatar_src: null,
      header_actions: userHeaderActionList,
      footer_actions: userFooterActionList,
      plug: {
        text: 'Выберите чат чтобы отправить сообщение или',
        button: {
          label: 'создайте чат',
          data: {
            type: 'createChat',
          },
          onClick: this.handlerUserActions.bind(this),
        },
      },
      sendForm,
      modal: {},
    });
  }

  async componentDidMount() {
    await AuthController.getUser();
    await ChatController.getChats();
  }

  async _chooseChatByID(id: number) {
    const { chats } = store.getState();

    const currentChat = chats?.items.find((element) => element.chatID === id);

    if (currentChat) {
      this.setProps({
        display_name: currentChat.title,
        avatar_src: currentChat.avatar.src,
      });

      await ChatController.getToken(id);
      await ChatController.online();
    }
  }

  async _sendMessage(data: Record<string, string>) {
    const { message } = data;

    await ChatController._send(message);
  }

  protected handlerUserActions(e: MouseEvent) {
    const target = e.currentTarget as HTMLInputElement;

    const actionType = target.getAttribute('data-type');

    if (!actionType) {
      return;
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
              type: 'submit',
            },
            onSubmit: this._createChat.bind(this),
          },
        },
      });
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
              type: 'submit',
            },
            onSubmit: this._addUserToChat.bind(this),
          },
        },
      });
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
              type: 'submit',
            },
            onSubmit: this._deleteUserFromChat.bind(this),
          },
        },
      });
    }

    this.toggleModal();
  }

  async _addUserToChat(data: Record<string, string>) {
    const storeData = store.getState();

    if (storeData.currentChat?.id) {
      const searchUsers = await UserController.search(data.login);

      if (searchUsers.length) {
        const searchUser = searchUsers[0];

        await ChatController.addUserToChat({
          users: [
            searchUser.id,
          ],
          chatId: storeData.currentChat?.id,
        });
      }
    }
  }

  async _deleteUserFromChat(data: Record<string, string>) {
    const storeData = store.getState();

    if (storeData.currentChat?.id) {
      const searchUsers = await UserController.search(data.login);

      if (searchUsers.length) {
        const searchUser = searchUsers[0];

        await ChatController.deleteUserFromChat({
          users: [
            searchUser.id,
          ],
          chatId: storeData.currentChat?.id,
        });
      }
    }
  }

  async _createChat(data: createChatFrom) {
    await ChatController.createChat({
      title: data.chatTitle,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.currentChat && newProps.currentChat) {
      if (oldProps.currentChat.id !== newProps.currentChat.id) {
        if (Number.isInteger(newProps.currentChat.id)) {
          this._chooseChatByID(newProps.currentChat.id);
        }
      }
    }

    return !isEqual(newProps, oldProps);
  }

  protected toggleModal() {
    for (const key in this.children) {
      const child = this.children[key];
      // @ts-ignore
      const childName = child.constructor.componentName;

      if (childName === 'Modal') {
        // @ts-ignore
        child.toggle();
      }
    }
  }

  test() {
    return {
      type: 'createChat',
    };
  }

  protected render(): string {
    // language=hbs
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
                        <div class="chat">
                            {{#if currentChat.id}}
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
                                    {{{Dialog messages=currentChat.messages}}}
                                </div>
                                <div class="chat__footer">
                                <!--
                                    <div class="attentions">
                                        {{{ActionList label=footer_actions.label items=footer_actions.items position='top'}}}
                                    </div>
                                -->
                                    {{{ChatForm button=sendForm.button inputs=sendForm.inputs onSubmit=sendForm.onSubmit}}}
                                </div>
                            {{else}}
                                <div class="chat__note">
                                    <span>{{{plug.text}}} {{{Button classes="button--text button--bottomBorder" name=plug.button.label type="button" data=plug.button.data onClick=plug.button.onClick }}}</span>
                                </div>
                            {{/if}}
                        </div>
                    </div>
                {{{Modal title=modal.title content=modal.form}}}
            </div>
        `;
  }
}
