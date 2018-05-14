const handlebars = require('handlebars');

handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

module.exports = { handlebars }