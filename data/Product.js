const crypto = require('crypto');

const items = [
  {
    id: '8765432',
    user_id: '12345',
    name: 'Supercharger Widget',
    description:
      "Probably the most important purchase you'll ever make. Supercharge your life!",
    price: 99,
  },
];

class Product {
  static getProducts() {
    return items;
  }

  static addProduct(newProduct) {
    const id = crypto.randomBytes(5).toString('hex');
    const added = {
      ...newProduct,
      id,
    };
    items.push(added);
    return added;
  }

  static findById(productId) {
    const product = items.find(({ id }) => id === productId);
    return product;
  }

  static update(productId, data) {
    const index = items.findIndex(({ id }) => id === productId);
    if (index === -1) return null;
    const updated = {
      ...items[index],
      ...data,
    };
    items[index] = updated;
    return updated;
  }
}

module.exports = Product;
