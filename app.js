const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authHandler = require('./handlers/authHandler');
const router = require('./routers/router');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(authHandler);
app.use(router);

app.listen(3000, () => {
  console.log('Server is listening on Port 3000');
});
