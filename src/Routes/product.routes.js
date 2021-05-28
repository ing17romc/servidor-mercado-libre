const { Router } = require('express');
const router = Router();

const { getSearch, getProductDetail } = require('../Controllers/product.controllers.js');

router.route('/')
    .get(getSearch);

    router.route('/:id')
    .get(getProductDetail);

module.exports = router;
