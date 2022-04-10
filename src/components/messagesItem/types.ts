export interface IMessagesItem {
    chatID: number;
    title: string;
    avatar: {
        src: string | null;
    },
    unread_count: number;
    last_message: {
        time: string;
        content: string;
    } | null,
}
