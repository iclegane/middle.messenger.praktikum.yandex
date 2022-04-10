import { expect } from 'chai';
import { Button } from './button';

describe('Компонент Button', () => {
  it('Установка значения type в компонент', () => {
    const button = new Button({
      name: 'Кнопка',
      type: 'button',
    });

    expect(button.getProps().type).to.equal('button');
  });
});
