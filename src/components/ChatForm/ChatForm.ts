import Form from '../Form';

export class ChatForm extends Form {
  static get componentName(): string {
    return 'ChatForm';
  }

  render() {
    // language=hbs
    return `
            <form id="{{_id}}" action="" class="form">
                {{#each inputs as |input|}}
                    {{{ Input type=input.type name=input.name validity=input.validity value=input.value required=input.required accept=input.accept classes=input.classes display_name=input.display_name  events=../events  }}}
                {{/each}}
                    
                {{{Button type=button.type classes=button.classes name=button.name}}}
            </form>
        `;
  }
}
