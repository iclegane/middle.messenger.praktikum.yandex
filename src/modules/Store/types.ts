import { IMessagesItem } from '../../components/messagesItem';
import { IDialogMessage } from '../../components/DialogMessage';

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

export interface StoreData {
    user?: User;
    token?: {
        value: string;
    };
    currentChat?: {
        id: number | null;
        messages: [IDialogMessage],
    }
    chats?: {
        items: Array<IMessagesItem>,
    };
    error?: {
        message: string,
    },
}
