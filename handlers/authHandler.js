const User = require('../data/User');

function authHandler(req, res, next) {
  req.user = User.getCurrentUser();
  next();
}

module.exports = authHandler;
