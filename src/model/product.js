const fs = require('fs');

const path = require('path');

const appRootDir = require('../utils/path');

const pdtFilePath = path.join(appRootDir, 'data', 'db.json');

const wishlistFilePath = path.join(appRootDir, 'data', 'wishlist.json');

//reading product db

const getALLProducts = (cb) => {
  fs.readFile(pdtFilePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, price, image, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  // add new item to product list/shop

  save(cb) {
    getALLProducts((products) => {
      products.push(this);
      fs.writeFile(pdtFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        console.log('ERROR', err);
      });
    });
  }

  // update product details

  update(cb) {
    getALLProducts((products) => {
      products = products.map((product) => {
        if (product.id !== this.id) {
          return product;
        }
        return this;
      });
      fs.writeFile(pdtFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        console.log('ERROR', err);
      });
    });
  }

  // get single product details using item

  static getProductDetailById(productID, cb) {
    getALLProducts((product) => {
      const productData = product.find(({ id }) => id === productID);
      cb(productData);
    });
  }

  // delete product

  static removeProduct(ID, cb) {
    getALLProducts((products) => {
      products = products.filter(({ id }) => id != ID);
      fs.writeFile(pdtFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          cb();
        }
      });
    });
  }

  // fetch all shop items

  static fetchAll(cb) {
    getALLProducts(cb);
  }
};
