import ChatAPI, {addUserToChatData, createChatData, deleteUserFromChatData} from "../api/ChatAPI";
import store from "../modules/Store/Store";
import {IMessagesItem} from "../components/Messages/components/messagesItem";




class ChatController {

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

            alert('Чат создан')
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

}

export default new ChatController();