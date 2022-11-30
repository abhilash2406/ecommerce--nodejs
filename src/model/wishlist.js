const fs = require('fs');

const path = require('path');

const appRootDir = require('../utils/path');

const cartFilePath = path.join(appRootDir, 'data', 'cart.json');
const wishlistFilePath = path.join(appRootDir, 'data', 'wishlist.json');

const getAllwishList = (cb) => {
  fs.readFile(wishlistFilePath, (err, fileContent) => {
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


  static _removeFromWishList(productID, cb) {
    getAllwishList((products) => {
      console.log('products', products);
      products = products.filter(({ id }) => id !== productID);
      console.log('products', products);
      fs.writeFile(wishlistFilePath, JSON.stringify(products), (err) => {
        if (!err) {
          cb();
        }
      });
    });
  }
  static addToWishList(prductDetails, cb) {
    getAllwishList((products) => {
      // if product exist
      const isExist =
        products.filter(({ id }) => id === prductDetails.id).length > 0;
      if (isExist) {
        products = products.map((product) => {
          return {
            ...product,
            
          };
        });
      } else {
        products.push({
          id: prductDetails.id,
          qty : 1,
        });
      }

      fs.writeFile(wishlistFilePath, JSON.stringify(products), (err) => {
        //console.log('ADD ERROR', err);
        if (!err) {
          cb();
        }
      });
    });
  }

  static removeFromWishList(ID, price) {
    getAllwishList((products) => {
      products = products.filter((id) => id !== ID);
      fs.writeFile(wishlistFilePath, JSON.stringify(products), (err) => {
        //console.log('UPDATE ERROR', err);
      });
    });
  }

  static fetchAll(cb) {
    getAllwishList(cb);
  }
};
