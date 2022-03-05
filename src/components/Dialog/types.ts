import {IDialogMessage} from "./components/DialogMessage/types";

export type IDialog = {
    groups: [{
        date: string,
        messages: Array<IDialogMessage>;
    }]
}