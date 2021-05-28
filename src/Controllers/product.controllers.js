const { searchProduct, productDetail } = require('../services/mercadolibre.service.js');
const { code500, description500 } = require('../Config');

const productCtrl = {};

productCtrl.getSearch = async (req, res) => {
    const { q } = req.query;
    const {quantity} = req.headers;

    try {
        const json = await searchProduct(q, quantity);
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
