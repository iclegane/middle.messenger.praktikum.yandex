export type IMessagesItem = {
    name: string;
    avatar: {
        src: string | null;
    },
    message: {
        delivery_time: string;
        preview_text: string;
        notification: {
            count: number | null;
        }
    }
}