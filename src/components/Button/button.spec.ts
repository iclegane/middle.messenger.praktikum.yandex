import { expect } from "chai";
import { Button } from "./button";

describe("Компонент Button", () => {

    let cleanup: Function

    beforeEach(() => {
        // eslint-disable-next-line global-require
        cleanup = require('jsdom-global')('<html><body><main id="#app"></main></body></html>') as Function
    })


    it('Установка значения type в компонент', () => {
        const button = new Button({
            name: 'Кнопка',
            type: 'button'
        })

        expect(button.props.type).to.equal('button')
    });

});