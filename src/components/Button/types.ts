export type IButtonProps = {
    name: string;
    classes:string;
    type: 'submit' | 'button' | 'reset';
    onClick? : () => void;
}