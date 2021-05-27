const { searchProduct, productDetail } = require('../services/mercadolibre.service.js');
const code500 = 500;
const description500 = 'Internal Server Occured';

const productCtrl = {};

productCtrl.getSearch = async (req, res) => {
    const { q } = req.query;

    try {
        const json = await searchProduct(q);
        res.json(json);
    } catch (e) {
        if (e.response && e.response.status) {
            res.status(e.response.status).send(e.message);
        } else {
            res.status(code500).send(description500);
        }
    }
};

productCtrl.getProductDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const json = await productDetail(id);
        res.json(json);
    } catch (e) {
        if (e.response && e.response.status) {
            res.status(e.response.status).send(e.message);
        } else {
            res.status(code500).send(description500);
        }
    }
};

module.exports = productCtrl;
