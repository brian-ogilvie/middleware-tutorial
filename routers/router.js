const { Router } = require('express');
const productsRouter = require('./productsRouter');
const reviewsRouter = require('./reviewsRouter');
const { notFound } = require('../handlers/errorHandler');

const router = Router();

router.use('/products', productsRouter);
router.use('/reviews', reviewsRouter);

router.use('*', notFound);

module.exports = router;
