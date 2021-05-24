const { Router } = require('express');
const router = Router();

const { getSearch, getProductDetail } = require('../controllers/product.controller.js');

router.route('/')
    .get(getSearch);

    router.route('/:id')
    .get(getProductDetail);

module.exports = router;
