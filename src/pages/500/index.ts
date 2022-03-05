import {ErrorPage} from "../../blocks/ErrorPage";
import {renderDOM} from "../../utils/renderDOM";



document.addEventListener('DOMContentLoaded', () => {

    const page = new ErrorPage({
        title: 'Ошибка 50*',
    });

    renderDOM('#root', page);
})