const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authHandler = require('./handlers/authHandler');
const Product = require('./models/Product');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(authHandler);

app.listen(3000, () => {
  console.log('Nile app is listening on Port 3000');
});
