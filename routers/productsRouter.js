const { Router } = require('express');
const productsHandler = require('../handlers/productsHandler');
const productsValidator = require('../middlewards/validation/productsValidator');
const { serverError } = require('../handlers/errorHandler');

const productsRouter = Router();

productsRouter.get('/', productsHandler.getAllProducts);

productsRouter.post(
  '/new',
  productsValidator.validateProductBody,
  productsHandler.postNewProduct
);

productsRouter.get(
  '/:productId',
  productsValidator.validateProductIdParam,
  productsHandler.getSingleProduct
);

productsRouter.put(
  '/:productId',
  productsValidator.validateProductIdParam,
  productsValidator.validateProductBody,
  productsHandler.updateProduct
);

productsRouter.use(serverError);
