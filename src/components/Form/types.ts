import {IInputProps} from "../Input";
import {IButtonProps} from "../Button";
import {ILinkProps} from "../Link";

export type IFormProps = {
    onInput?: () => void;
    inputs: Array<IInputProps>;
    button: IButtonProps;
    link?: ILinkProps;
}