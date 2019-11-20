const { Router } = require('express');

const reviewsRouter = Router();

reviewsRouter.use('*', (req, res) => res.send('Reviews!'));

module.exports = reviewsRouter;
