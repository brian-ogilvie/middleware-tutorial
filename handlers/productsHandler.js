const Product = require('../data/Product');

function getAllProducts(req, res, next) {
  try {
    const products = Product.getProducts();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
}

function postNewProduct(req, res, next) {
  try {
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
}

function getSingleProduct(req, res, next) {
  try {
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
}

function updateProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const updated = Product.update(productId, req.body);
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllProducts,
  postNewProduct,
  getSingleProduct,
  updateProduct,
};
