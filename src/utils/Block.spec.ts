import { expect } from "chai";
import * as Handlebars from "handlebars";

describe("Шаблонизатор", () => {

    let cleanup: Function

    beforeEach(() => {
        // eslint-disable-next-line global-require
        cleanup = require('jsdom-global')('<html><body><main id="#app"></main></body></html>') as Function
    })


    it('Передача данных в шаблон', () => {

        const button = '<button>{{{test}}}</button>'

        const template= Handlebars.compile(button);

        const templateString = template({
            test: 'test'
        });

        expect(templateString).to.equal('<button>test</button>')
    });
});