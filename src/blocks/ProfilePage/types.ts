import {IFormProps} from "../../components/Form";
import {ILinkProps} from "../../components/Link";

export type IProfileProps = {
    title: string;
    header?: {
        image?: {
            src: string;
        }
    },
    body?: {
        userData?: Array<Record<string, string>>;
        form?: IFormProps;
    },
    footer?:{
        links: Array<ILinkProps>;
    },
    navigation?: ILinkProps;
}