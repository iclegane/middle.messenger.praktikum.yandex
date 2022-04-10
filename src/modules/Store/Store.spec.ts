import { expect } from 'chai';
import store from './Store';

describe('Store', () => {
  it('Проверка установки значения в стор', () => {
    const props = {
      id: '1',
    };

    store.set('currentChat', props);

    expect(store.getState().currentChat?.id).to.equal('1');
  });
});
