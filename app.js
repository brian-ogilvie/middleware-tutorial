require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authHandler = require('./handlers/authHandler');
const productsHandler = require('./handlers/productsHandler');
const productsValidator = require('./middlewards/validation/productsValidator');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(authHandler);

app.get('/products', productsHandler.getAllProducts);

app.post(
  '/products/new',
  productsValidator.validateProductBody,
  productsHandler.postNewProduct
);

app.get(
  '/products/:productId',
  productsValidator.validateProductIdParam,
  productsHandler.getSingleProduct
);

app.put(
  '/products/:productId',
  productsValidator.validateProductIdParam,
  productsValidator.validateProductBody,
  productsHandler.updateProduct
);

app.use('*', (err, req, res) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}.`);
});
