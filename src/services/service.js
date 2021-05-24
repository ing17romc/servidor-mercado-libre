
const axios = require('axios');
const filter_category = process.env.FILTER_CATEGORY;
const api_ml_search = process.env.API_MERCADO_LIBRE_SEARCH;
const api_ml_product_detail = process.env.API_MERCADO_LIBRE_PRODUCT_DETAIL;
const path_product_description = process.env.PATH_PRODUCT_DESCRIPTION;
const name = 'N/A';
const lastname = 'N/A';

const service = {};

service.searchProduct = async (q) => {
    const url = `${api_ml_search}${q}`;
    try {
        console.log(url);
        const response = await axios.get(url);
        const data = response.data;

        const categories = [];
        const first_filter = data.filters.find(element => element.id === filter_category);
        if (first_filter) {
            first_filter.values.find(value => value.path_from_root.forEach(element => categories.push(element.name)));
        }

        const items = [];
        data.results.forEach(element => items.push(
            {
                id: element.id,
                title: element.title,
                price: {
                    currency: element.currency_id,
                    amount: element.available_quantity,
                    decimals: formatterPeso.format(element.price),
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
                    currency: data.currency_id,
                    amount: data.available_quantity,
                    decimals: formatterPeso.format(data.price),
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

const getProductDescription = async (id) => {
    try {
        return await service.productDescription(id);
    } catch {
        return '';
    }
};

const getCondition = value => {
    if (value === 'used') {
        return 'Usado';
    }    else if (value === 'new') {
        return 'Nuevo';
    }    else {
        return value;
    }
};

const formatterPeso = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    useGrouping: true,
});

module.exports = service;
