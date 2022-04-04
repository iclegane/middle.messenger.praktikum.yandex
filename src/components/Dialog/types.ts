import {IDialogMessage} from "../DialogMessage/types";

export type IDialog = {
    groups: [{
        date: string,
        messages: Array<IDialogMessage>;
    }]
}