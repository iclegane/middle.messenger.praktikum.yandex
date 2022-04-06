import ChatAPI, { addUserToChatData, createChatData, deleteUserFromChatData } from '../api/ChatAPI';
import store from '../modules/Store/Store';
// import { IMessagesItem } from '../components/messagesItem';
import { ChatSocket } from '../modules/ChatSocked/ChatSocked';
import { dateFormattedTime } from '../utils/dateFormatted';
import { IDialogMessage } from '../components/DialogMessage';

export type DialogMessage = {
    id: number;
    chat_id: number;
    content: string;
    message_id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

class ChatController {
  socket: ChatSocket | undefined;

  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    try {
      const chatsResponse = await this.api.getChats();

      const chats = chatsResponse.map((chat) => {
        const last_message = {
          time: chat.last_message?.time,
          content: chat.last_message?.content,
        };

        return {
          chatID: chat.id,
          title: chat.title,
          avatar: {
            src: chat.avatar,
          },
          unread_count: chat.unread_count,
          last_message: chat.last_message ? last_message : null,
        };
      });

      store.set('chats', {
        items: chats,
      });
    } catch (e) {}
  }

  async createChat(data: createChatData) {
    try {
      await this.api.createChat(data);

      await this.getChats();
    } catch (e) {
      throw new Error(`createChatController${e}`);
    }
  }

  async addUserToChat(data: addUserToChatData) {
    try {
      await this.api.addUserToChat(data);

      alert('Пользователь успешно добавлен');
    } catch (e) {
      throw new Error(`addUserToChat${e}`);
    }
  }

  async deleteUserFromChat(data: deleteUserFromChatData) {
    try {
      await this.api.deleteUserFromChat(data);
      alert('Пользователь успешно удален');
    } catch (e) {
      throw new Error(`deleteUserFromChat${e}`);
    }
  }

  async getToken(id: number) {
    try {
      const data = await this.api.getToken({
        id,
      });

      store.set('token', {
        value: data.token,
      });
    } catch (e) {
      throw new Error('Token error');
    }
  }

  async online() {
    this.socket = new ChatSocket();
    await this.socket.init();
    this.socket?.getOld();

    this.socket?.addEvents(ChatSocket.EVENTS.message, this._onNewMessage);
    this.socket?.addEvents(ChatSocket.EVENTS.getOld, this._onOldMessages);
  }

  _onNewMessage(newMessage: any) {
    try {
      const currentUserId = store.getState().user?.id;
      const messages = store.getState().currentChat?.messages;

      if (currentUserId) {
        const message: IDialogMessage = {
          message_id: newMessage.id,
          is_read: newMessage.is_read ? newMessage.is_read : false,
          content: newMessage.content,
          type: newMessage.type ? newMessage.type : 'message',
          date: {
            default: newMessage.time,
            time: dateFormattedTime(newMessage.time),
          },
          is_owner: currentUserId === newMessage.userId,
        };

        if (messages) {
          store.set('currentChat', {
            messages: [
              ...messages,
              message,
            ],
          });
        }
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  _onOldMessages(oldMessage: Array<DialogMessage>) {
    try {
      const currentUserId = store.getState().user?.id;

      if (currentUserId) {
        console.log(oldMessage);
        const messages: Array<IDialogMessage> = oldMessage.map((message) => ({
          message_id: message.id,
          is_read: message.is_read ? message.is_read : false,
          content: message.content,
          type: message.type ? message.type : 'message',
          date: {
            default: message.time,
            time: dateFormattedTime(message.time),
          },
          is_owner: currentUserId === message.user_id,
        }));

        store.set('currentChat', {
          messages,
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  _send(message: string) {
    this.socket?.sendMessage(message);
  }
}

export default new ChatController();
