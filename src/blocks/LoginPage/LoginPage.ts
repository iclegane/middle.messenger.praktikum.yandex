import { Block } from '../../modules/Block';
import AuthController from '../../controllers/AuthController';
import { REGEXP } from '../../utils/REGEXP';
import { SignUpDate } from '../../api/AuthAPI';

export class LoginPage extends Block {
  constructor() {
    super();

    this.setProps({
      title: 'Авторизация',
      form: {
        inputs: [
          {
            name: 'login',
            type: 'text',
            display_name: 'Логин',
            validity: REGEXP.LOGIN,
            value: '',
            required: true,
          },
          {
            name: 'password',
            type: 'password',
            display_name: 'Пароль',
            validity: REGEXP.PASSWORD,
            value: '',
            required: true,
          },
        ],
        button: {
          type: 'submit',
          name: 'Войти',
          classes: 'button--round button--blue',
        },
        link: {
          label: 'Зарегистрироваться',
          href: '/registration/',
          classes: 'link--blue',
        },
      },
      onSubmit: this.onSubmit.bind(this),
      error: {
        message: '',
      },
    });
  }

  async onSubmit(data: SignUpDate) {
    await AuthController.signIn(data as SignUpDate);
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="window">
                <div class="title">{{title}}</div>
                
                {{{Form inputs=form.inputs button=form.button link=form.link onSubmit=onSubmit}}}
                
                {{#if error.message}}
                    <div class="error-block">
                        <span class="error-block__message">{{{error.message}}}</span>
                    </div>
                {{/if}}
            </div>
        `;
  }
}
