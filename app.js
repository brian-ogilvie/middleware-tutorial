require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');

const User = require('./data/User');
const Product = require('./data/Product');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('*', (req, res, next) => {
  req.user = User.getCurrentUser();
  next();
});

app.get('/products', (req, res, next) => {
  try {
    const products = Product.getProducts();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
});

app.post('/products/new', (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number()
        .positive()
        .precision(2)
        .required(),
    });
    const { error } = bodySchema.validate(req.body);
    if (error) {
      const errors = error.details.map(({ message }) => message);
      res.status(400).json({ errors });
      return;
    }
    const { id: userId } = req.user;
    const newProduct = {
      ...req.body,
      user_id: userId,
    };
    const added = Product.addProduct(newProduct);
    res.status(201).json({ ...added });
  } catch (e) {
    next(e);
  }
});

app.get('/products/:productId', (req, res, next) => {
  try {
    const productIdSchema = Joi.object({
      productId: Joi.string()
        .max(10)
        .required(),
    });
    const { error } = productIdSchema.validate(req.params);
    if (error) {
      const errors = error.details.map(({ message }) => message);
      res.status(400).json({ errors });
      return;
    }
    const { productId } = req.params;
    const product = Product.findById(productId);
    if (!product) {
      res.status(400).json({ error: 'Invalid Product ID' });
      return;
    }
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
});

app.put('/products/:productId', (req, res, next) => {
  try {
    const productIdSchema = Joi.object({
      productId: Joi.string()
        .max(10)
        .required(),
    });
    const { error: productIdError } = productIdSchema.validate(req.params);
    if (productIdError) {
      const errors = productIdError.details.map(({ message }) => message);
      res.status(400).json({ errors });
      return;
    }
    const bodySchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number()
        .positive()
        .precision(2)
        .required(),
    });
    const { error: bodyError } = bodySchema.validate(req.body);
    if (bodyError) {
      const errors = bodyError.details.map(({ message }) => message);
      res.status(400).json({ errors });
      return;
    }
    const { productId } = req.params;
    const updated = Product.update(productId, req.body);
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
});

app.use('*', (err, req, res) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}.`);
});
