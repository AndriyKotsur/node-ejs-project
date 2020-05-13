
const i18nHelper = (req, res, next) => {

    res.locals.__ = res.__;
    next();
};

module.exports = i18nHelper;