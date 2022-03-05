import * as Handlebars from "handlebars";

Handlebars.registerHelper('isNull', function (value) {
    return value !== null;
});
