export enum StoreEvents {
    Updated = 'updated'
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface Chat {
    id: number;
    chatID: number;
    title: string;
    name: string;
    avatar: {
        src: string;
    },
    created_by: number;
    unread_count: number;
    last_message: string | null;
}


export interface StoreData {
    user?: User;
    token?: {
        value: string;
    };
    currentChat?: {
        id: number | null;
        messages: [],
    }
    chats?: {
        items: Array<Chat>,
    };

}