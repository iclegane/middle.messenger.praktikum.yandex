import { expect } from 'chai';
import * as Handlebars from 'handlebars';

describe('Шаблонизатор', () => {
  it('Передача данных в шаблон', () => {
    const button = '<button>{{{test}}}</button>';

    const template = Handlebars.compile(button);

    const templateString = template({
      test: 'test',
    });

    expect(templateString).to.equal('<button>test</button>');
  });
});
