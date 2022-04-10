import BaseAPI from './BaseAPI';

export interface createChatData {
    title: string;
}

export type getChatsResponse = {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: lastMessage | null;
}
export type lastMessage = {
    user: {
        first_name: string;
        second_name: string;
        avatar: string | null;
        email: string;
        login: string;
        phone: string;
    };
    time: string;
    content: string;
}

export type addUserToChatData = {
    users: Array<number>;
    chatId: number;
}

export type deleteUserFromChatData = {
    users: Array<number>;
    chatId: number;
}

export type Token = {
    token: string;
}

export type ChatID = {
    id: number
}

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats(): Promise<Array<getChatsResponse>> {
    return this.http.get('', {});
  }

  addUserToChat(data: addUserToChatData): Promise<unknown> {
    return this.http.put('/users', {
      data,
    });
  }

  deleteUserFromChat(data: deleteUserFromChatData): Promise<unknown> {
    return this.http.delete('/users', {
      data,
    });
  }

  createChat(data: createChatData): Promise<unknown> {
    return this.http.post('', {
      data,
    });
  }

  getToken(data: ChatID): Promise<Token> {
    const path = `/token/${data.id}`;

    return this.http.post(path, {

    });
  }
}
