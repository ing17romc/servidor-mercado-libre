const constant = {};

constant.port = process.env.PORT;
constant.code500 = 500;
constant.description500 = 'Internal Server Occured';
constant.name = 'N/A';
constant.lastname = 'N/A';

constant.filter_category = process.env.FILTER_CATEGORY;
constant.api_ml_search = process.env.API_MERCADO_LIBRE_SEARCH;
constant.api_ml_product_detail = process.env.API_MERCADO_LIBRE_PRODUCT_DETAIL;
constant.path_product_description = process.env.PATH_PRODUCT_DESCRIPTION;
constant.code_language_country = process.env.CODE_LANGUAGE_COUNTRY;
constant.conditionEN = {
    used: 'used',
    new: 'new',
};
constant.conditionES = {
    used: 'usado',
    new: 'nuevo',
};

module.exports = constant;
