import Block from '../../utils/Block'
import {IInputProps} from "./types";


export class Input extends Block {

    protected readonly errorClass : string = 'input-group__input--invalid';

    constructor({type = 'text', value, name, pattern, required, classes, display_name, events}: IInputProps) {
        super({
            type,
            value,
            name,
            pattern,
            required,
            classes,
            display_name,
            events: {
                ...events,
                input: (e: Event) => {
                    const { value } = e.target as HTMLInputElement
                    this.element.value = value;

                    this.validateValue(e);
                },
                focus: (e: Event) => {
                    if (this.valid) {
                        this.validateValue(e)
                    }

                },
                blur: () => {
                    this._validate()
                },
            }
        });
    }

    protected validateValue(e: Event) {
        const { value } = e.target as HTMLInputElement;

        if (value && value.length) {
            this._validate()
        } else {
            this.toggleClass(this.errorClass, false)
        }
    }

    private _validate() {
        this.toggleClass(this.errorClass, !this.valid)
    }

    get valid() {
        return this.element.validity.valid
    }

    get element() {
        return this._element as HTMLInputElement
    }

    protected render(): string {

        //language=hbs
        return `<input 
                class="input input-group__input {{classes}}"
                id="{{ _id }}"
                type="{{type}}" 
                name="{{name}}"
                placeholder="{{display_name}}"
                autocomplete="off"
                value="{{value}}"
                {{#if pattern}}
                    pattern="{{pattern}}"
                {{/if}}
                {{#if required}}
                    required
                {{/if}}
                >
        `;
    }
}