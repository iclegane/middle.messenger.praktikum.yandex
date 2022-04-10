import { IFormProps } from '../../components/Form';
import { ILinkProps } from '../../components/Link';
import { IButtonProps } from '../../components/Button';

export type IProfileProps = {
    title: string;
    header?: {
        image?: {
            src: string;
        },
    },
    body?: {
        userData?: Array<Record<string, unknown>>;
        form?: IFormProps;
    },
    footer?:{
        links: Array<ILinkProps>;
        buttons: Array<IButtonProps>;
    },
    navigation?: {
        link: ILinkProps;
        button: IButtonProps;
    },
};
