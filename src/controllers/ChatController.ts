import ChatAPI, {addUserToChatData, createChatData, deleteUserFromChatData} from "../api/ChatAPI";
import store from "../modules/Store/Store";
import {IMessagesItem} from "../components/messagesItem";
import {ChatSocket} from "../modules/ChatSocked/ChatSocked";




class ChatController {

    socket: ChatSocket | undefined

    private api: ChatAPI;

    constructor() {
        this.api = new ChatAPI();
    }

    async getChats() {
        const chatsResponse = await this.api.getChats();

        const chats: Array<IMessagesItem> = [];

        chatsResponse.forEach((chat) => {

            chats.push({
                chatID: chat.id,
                name: chat.title,
                avatar: {
                    src: chat.avatar
                },
                message: {
                    preview_text: chat.last_message,
                    notification: {
                        count: chat.unread_count,
                    }
                }
            })
        })

        store.set('chats', {
            items: chats
        });
    }

    async createChat(data: createChatData) {

        try {
            await this.api.createChat(data);

            await this.getChats();





        } catch (e) {
            throw new Error('createChatController' + e)
        }
    }

    async addUserToChat(data: addUserToChatData) {
        try {

            await this.api.addUserToChat(data);


            alert('Пользователь успешно добавлен')
        } catch (e) {
            throw new Error('addUserToChat' + e)
        }
    }

    async deleteUserFromChat(data: deleteUserFromChatData) {
        try {
            await this.api.deleteUserFromChat(data);
            alert('Пользователь успешно удален')
        } catch (e) {
            throw new Error('deleteUserFromChat' + e)
        }
    }

    async getToken(id: number) {
        const data = await this.api.getToken({
            id: id
        })

        store.set('token', {
            value: data.token
        });
    }

    async online() {
        this.socket = new ChatSocket();
        await this.socket.init()
        this.socket?.getOld()

        this.socket?.addEvents(ChatSocket.EVENTS.message, this._onNewMessage)
        this.socket?.addEvents(ChatSocket.EVENTS.getOld, this._onOldMessages)
    }

    _onNewMessage(message: any) {
        const messages = store.getState().currentChat.messages;
        //@ts-ignore
        messages.push(message);

        store.set('currentChat', {
            messages: messages
        })
    }

    _onOldMessages(oldMessage: any) {
        store.set('currentChat', {
            messages: oldMessage
        })
    }

    _send(message: string) {
        this.socket?.sendMessage(message)
    }

}

export default new ChatController();