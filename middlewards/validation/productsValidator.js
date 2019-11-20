const Joi = require('@hapi/joi');
const validate = require('./validate');

function validateProductIdParam(req, res, next) {
  const productIdSchema = Joi.object({
    productId: Joi.string()
      .max(10)
      .required(),
  });
  validate(productIdSchema, req.params, res, next);
}

function validateProductBody(req, res, next) {
  const bodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number()
      .positive()
      .precision(2)
      .required(),
  });
  validate(bodySchema, req.body, res, next);
}

module.exports = {
  validateProductIdParam,
  validateProductBody,
};
