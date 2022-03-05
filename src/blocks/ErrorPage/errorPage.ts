import Block from "../../utils/Block";

export class ErrorPage extends Block {

    render() {
        //language=hbs
        return `
            <h1>{{title}}</h1>
        `;
    }
}