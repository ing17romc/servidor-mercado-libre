const style = process.env.FORMATTER_CURRENCY_STYLE;
const currency = process.env.FORMATTER_CURRENCY;
const code_language_country = process.env.FORMATTER_CURRENCY_CODE_LANGUAGE_COUNTRY;

const utils = {};

const conditionEN = {
    used: 'used',
    new: 'new',
};

const conditionES = {
    used: 'usado',
    new: 'nuevo',
};

utils.getCondition = value => {
    if (value === conditionEN.used) {
        return conditionES.used;
    }    else if (value === conditionEN.new) {
        return conditionES.new;
    }    else {
        return value;
    }
};

utils.formatterCurrency = new Intl.NumberFormat(code_language_country, {
    style,
    currency,
    minimumFractionDigits: 0,
});

module.exports = utils;

