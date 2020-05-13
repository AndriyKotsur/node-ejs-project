const i18n = require('i18n');

i18n.configure({
    locales: ['uk', 'en'],
    fallbacks: {
        'uk': 'en'
    },
    defaultLocale: 'uk',
    cookie: '_locale_lang',
    queryParameter: 'lang',
    autoReload: true,
    directory: __dirname + '/../locales',
    directoryPermissions: '755',
    objectNotation: true,
    register: global
});



module.exports = i18n;