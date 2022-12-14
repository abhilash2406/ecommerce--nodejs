const fs = require('fs');

const path = require('path');

const appRootDir = require('../utils/path');


const cartFilePath = path.join(appRootDir, 'data', 'cart.json');

// reading cart db

const getAllCartPoducts = (cb) => {
  fs.readFile(cartFilePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Cart {
  constructor(id, price) {
    this.id = id;
    this.price = price;
  }

  static updateCart(productID, isAdd, cb) {
    // get all cart products
    // find specific product

    getAllCartPoducts((products) => {
      const data = products
        .map((product) => ({
          ...product,
          qty:
            product.id === productID
              ? isAdd
                ? product.qty + 1
                : product.qty - 1
              : product.qty,
        }))
        .filter(({ qty }) => qty > 0);
      fs.writeFile(cartFilePath, JSON.stringify(data), (err) => {
        if (!err) {
          cb();
        }
      });
    });
  }
  // remove from cart operation

  static removeFromCart(productID, cb) {
    getAllCartPoducts((products) => {
      products = products.filter(({ id }) => id !== productID);
      fs.writeFile(cartFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          cb();
        }
      });
    });
  }

// add to cart

  static addToCart(prductDetails, cb) {
    getAllCartPoducts((products) => {
      // if product exist
      const isExist =
        products.filter(({ id }) => id === prductDetails.id).length > 0;
      if (isExist) {
        products = products.map((product) => {
          return {
            ...product,
            qty:
              product.id === prductDetails.id ? product.qty + 1 : product.qty,
          };
        });
      } else {
        products.push({
          id: prductDetails.id,
          price: prductDetails.price,
          qty: 1,
        });
      }

      fs.writeFile(cartFilePath, JSON.stringify(products), (err) => {
        //console.log('ADD ERROR', err);
        if (!err) {
          cb();
        }
      });
    });
  }

  // fetch whole cart

  static fetchAll(cb) {
    getAllCartPoducts(cb);
  }
};
