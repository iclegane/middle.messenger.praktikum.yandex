import { expect } from 'chai';
import Router from './Router';
import { Block } from '../Block';

class PageStart extends Block {
  constructor() {
    super();
  }
}
class PageOther extends Block {
  constructor() {
    super();
  }
}

describe('Router', () => {
  it('Параметр rootQuery устанавливается правильно', () => {
    const router = new Router('#app');
    router
      .use('/', PageStart)
      .use('/two', PageOther);

    // @ts-ignore
    expect(router._rootQuery).to.equal('#app');
  });
});
