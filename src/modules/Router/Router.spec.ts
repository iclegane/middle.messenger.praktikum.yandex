import { expect } from "chai";
import { Router } from "./Router";
import Block from "../../utils/Block";

class PageStart extends Block {

    constructor() {
        super()
    }
}
class PageOther extends Block {

    constructor() {
        super()
    }
}

describe("Router", () => {

    let cleanup: Function

    beforeEach(() => {
        // eslint-disable-next-line global-require
        cleanup = require('jsdom-global')('<html><body><main id="#app"></main></body></html>') as Function
    })


    it('Параметр rootQuery устанавливается правильно', () => {
        const router = new Router('#app');
        router
            .use("/", PageStart)
            .use("/two", PageOther)

        expect(router._rootQuery).to.equal('#app')
    });

});