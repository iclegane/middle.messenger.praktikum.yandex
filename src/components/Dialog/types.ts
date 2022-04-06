import { IDialogMessage } from '../DialogMessage';

export type Group = {
    time: string,
    messages: IDialogMessage,
}

export type IDialog = {
    messages: Array<IDialogMessage>;
    groups: Array<Group>
}
