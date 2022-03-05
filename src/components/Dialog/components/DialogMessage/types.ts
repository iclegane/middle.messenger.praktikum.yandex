export type IDialogMessage = {
    message_type: 'photo' | 'file' | 'location' | 'text';
    delivery_time:string;
    status: 'send' | 'received';
    meta?: 'read';
    isOwner: boolean;
    attachments?: {
        text?: string;
        photo?: {
            src:string;
            width:number;
            height:number;
        }
    }
}
