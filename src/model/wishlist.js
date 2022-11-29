const fs = require('fs');

const path = require('path');

const appRootDir = require('../utils/path');

const wishlistFilePath = path.join(appRootDir, 'data', 'wishlist.json');

const getAllWishlist = (cb) => {
  fs.readFile(wishlistFilePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Whishlist {
  constructor(id) {
    this.id = id;
  }

  save(cb) {
    getAllWishlist((products) => {
      products.push(this.id);
      fs.writeFile(wishlistFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        console.log('ERROR', err);
      });
    });
  }

  update(cb) {
    getAllWishlist((products) => {
      products = products.filter((id) => id !== this.id);
      console.log(products);
      fs.writeFile(wishlistFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        console.log('ERROR', err);
      });
    });
  }

  static fetchAll(cb) {
    getAllWishlist(cb);
  }
};
