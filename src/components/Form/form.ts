import { Block } from '../../modules/Block';
import { IFormProps } from './types';
import { getFormData } from '../../utils/getFormData';

export class Form extends Block {
  static get componentName() : string {
    return 'Form';
  }

  constructor({
    inputs, button, link, onSubmit,
  } : IFormProps) {
    super({
      inputs,
      button,
      link,
      onSubmit,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const data = getFormData(form);

          if (form.checkValidity()) {
            if (onSubmit) {
              // @ts-ignore
              onSubmit(data);
            }
          }
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
            <form id="{{_id}}" action="" class="form">
                <div class="form__wrapper">
        
                    {{#each inputs as |input|}}
                        <div class="input-group">
                            <label class="input-group__label" for={{input.name}}>{{input.display_name}}</label>
                            {{{ Input type=input.type name=input.name validity=input.validity value=input.value required=input.required accept=input.accept  events=../events  }}}
                        </div>
                    {{/each}}

                    <div class="form__controls">
                        {{{Button classes='button--round button--blue' type=button.type name=button.name}}}
                        {{{Link label=link.label href=link.href classes=link.classes}}}
                    </div>
                </div>
            </form>
        `;
  }
}
