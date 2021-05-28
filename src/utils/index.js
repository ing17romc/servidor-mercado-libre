const utils = {};
const { conditionEN, conditionES } = require('../Config');

utils.getCondition = value => {
    if (value === conditionEN.used) {
        return conditionES.used;
    } else if (value === conditionEN.new) {
        return conditionES.new;
    } else {
        return value;
    }
};

module.exports = utils;

