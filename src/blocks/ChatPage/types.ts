import {ILinkProps} from "../../components/Link";
import {IInputProps} from "../../components/Input";
import {IMessagesItem} from "../../components/messagesItem";
import {IActionList} from "../../components/ActionList";
import {IDialog} from "../../components/Dialog";

export type IChatPage = {
    navigation?:{
        link: ILinkProps
    },
    search?: {
        input: IInputProps;
    },
    messages?: {
        items: Array<IMessagesItem>
    },
    footer_actions?: IActionList
    header_actions?: IActionList,
    dialog?: IDialog;
}


export type createChatFrom = {
    chatTitle: string;
}