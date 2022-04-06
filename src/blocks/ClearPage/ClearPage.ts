import { Block } from '../../modules/Block';

export class ClearPage extends Block {
  render() {
    // language=hbs
    return `
            <h1>{{title}}</h1>
        `;
  }
}
