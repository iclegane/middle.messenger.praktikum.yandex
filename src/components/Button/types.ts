export type IButtonProps = {
    name: string;
    classes?:string;
    type: 'submit' | 'button' | 'reset';
    data?: {
        type: string;
    }
    onClick? : () => void;
}