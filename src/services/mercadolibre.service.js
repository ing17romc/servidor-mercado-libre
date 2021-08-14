
const axios = require('axios');
const getSymbolFromCurrency = require('currency-symbol-map');
const { getCondition } = require('../utils/index.js');
const { 
    name, 
    lastname, 
    filter_category, 
    api_ml_search, 
    api_ml_product_detail, 
    path_product_description, 
    code_language_country 
} = require('../Config');

const service = {};

/**
 * @decriptionFuntion function that performs the search
 * @author Rafael Orlando Márquez Cedeño
 * @param {*} q courage to seek
 * @param {*} quantity number of results to be displayed
 */
service.searchProduct = async (q, quantity) => {

    const url = `${api_ml_search}${q}`;
    try {
        const response = await axios.get(url);
        const data = response.data;

        const categories = [];
        const first_filter = data.filters.find(element => element.id === filter_category);
        if (first_filter) {
            first_filter.values.find(value => value.path_from_root.forEach(element => categories.push(element.name)));
        }

        const items = [];
        data.results.filter(( element ,index) => index < quantity).forEach(element => items.push(
            {
                id: element.id,
                title: element.title,
                price: {
                    currency: getSymbolFromCurrency(element.currency_id),
                    amount: element.available_quantity,
                    decimals: element.price.toLocaleString(code_language_country),
                },
                picture: element.thumbnail,
                condition: getCondition(element.condition),
                free_shipping: element.shipping.free_shipping,
                state_name: element.address.state_name,
            }
        ));

        return {
            author: {
                name,
                lastname,
            },
            categories,
            items,
        };

    } catch (e) {
        if (e.response) {
            throw e;
        } else {
            throw new Error(e.message);
        }
    }
};

/**
 * @decriptionFuntion function that looks up the description of a product
 * @author Rafael Orlando Márquez Cedeño
 * @param {*} id product identifier
 */
service.productDescription = async (id) => {
    const url = `${api_ml_product_detail}${id}${path_product_description}`;
    try {
        const response = await axios.get(url);
        return response.data.plain_text;
    } catch (e) {
        if (e.response) {
            throw e;
        } else {
            throw new Error(e.message);
        }
    }
};
/**
 * @decriptionFuntion function that returns the product description
 * @author Rafael Orlando Márquez Cedeño
 * @param {*} id product identifier
 */
service.productDetail = async (id) => {
    const url = `${api_ml_product_detail}${id}`;
    const description = await getProductDescription(id);
    try {
        const response = await axios.get(url);
        const data = response.data;
        return {
            author: {
                name,
                lastname,
            },
            item: {
                id: data.id,
                title: data.title,
                price: {
                    currency: getSymbolFromCurrency(data.currency_id),
                    amount: data.available_quantity,
                    decimals: data.price.toLocaleString(code_language_country),
                },
                picture: data.pictures[0].url,
                condition: getCondition(data.condition),
                free_shipping: data.shipping.free_shipping,
                sold_quantity: data.sold_quantity,
                description,
            },
        };
    } catch (e) {
        if (e.response) {
            throw e;
        } else {
            throw new Error(e.message);
        }
    }
};
/**
 * @decriptionFuntion function that returns the product description
 * @author Rafael Orlando Márquez Cedeño
 * @param {*} id product identifier
 */
const getProductDescription = async (id) => {
    try {
        return await service.productDescription(id);
    } catch {
        return '';
    }
};

module.exports = service;
