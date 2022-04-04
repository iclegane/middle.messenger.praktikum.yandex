export type IInputProps = {
    type: 'text' | 'password' | 'email' | 'file';
    accept?: string;
    display_name?: string;
    value?: string | null;
    name: string;
    validity?: Record<string, string>;
    required: boolean;
    classes?: string;
    events?: Array<Event>
}