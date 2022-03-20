export type IMessagesItem = {
    chatID: number;
    name: string;
    avatar: {
        src: string | null;
    },
    message: {
        delivery_time?: string;
        preview_text: string | null;
        notification: {
            count: number;
        }
    }
}