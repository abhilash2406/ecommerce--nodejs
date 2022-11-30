const Product = require('../../model/product');
const Cart = require('../../model/cart');
const WishList = require('../../model/wishlist')


// display all products in shop controller

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.fetchAll((cartProducts) => {
      WishList.fetchAll((wishlistitems)=>{
res.render('shop/shop', {
        pageTitle: 'Shop',
        cartlength : cartProducts.length,
        products: products.map((product) => ({
          ...product,
        })),

        activeLink: '/',
      });
    });
    });
  });
};
