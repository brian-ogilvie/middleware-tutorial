require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hi!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}.`);
});
