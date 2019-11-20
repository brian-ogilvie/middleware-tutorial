function serverError(err, req, res) {
  // log the error
  // alert tech support
  res.status(500).json({ error: err.message });
}

function notFound(req, res) {
  res.sendStatus(404);
}

module.exports = {
  serverError,
  notFound,
};
