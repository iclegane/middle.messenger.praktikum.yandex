import BaseAPI from "./BaseAPI";


export interface createChatData {
    title: string;
}


export type getChatsResponse = {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    unread_count: number;
    last_message: null;
}

export type addUserToChatData = {
    users: Array<number>;
    chatId: number;
}

export type deleteUserFromChatData  = {
    users: Array<number>;
    chatId: number;
}


export default class ChatAPI extends BaseAPI {

    constructor() {
        super('/chats');
    }

    getChats(): Promise<Array<getChatsResponse>> {
        return this.http.get('', {

        });
    }

    addUserToChat(data: addUserToChatData): Promise<unknown> {
        return this.http.put('/users', {
            data
        })
    }

    deleteUserFromChat(data: deleteUserFromChatData): Promise<unknown> {
        return this.http.delete('/users', {
            data
        })
    }

    createChat(data: createChatData): Promise<unknown> {
        return this.http.post('', {
            data
        })
    }


    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}