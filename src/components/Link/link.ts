import { Block } from '../../modules/Block';
import { ILinkProps } from './types';

export class Link extends Block {
  static get componentName() : string {
    return 'Link';
  }

  constructor({
    label, href, classes, router,
  } : ILinkProps) {
    super({
      label,
      href,
      classes,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          router.go(href);
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
            <a class="link {{classes}}" href="{{href}}">
                {{label}}
            </a>
        `;
  }
}
