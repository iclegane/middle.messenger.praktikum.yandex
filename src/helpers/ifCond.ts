import * as Handlebars from 'handlebars'

Handlebars.registerHelper('ifCond', function(v1, v2) {
    if(v1 === v2) {
        return true
    } else {
        return false
    }
});
