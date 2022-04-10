export type IDialogMessage = {
    message_id: number;
    content: string;
    is_read: boolean | undefined;
    type: string;
    date: {
        default: string;
        time: string;
    },
    is_owner: boolean;
}
