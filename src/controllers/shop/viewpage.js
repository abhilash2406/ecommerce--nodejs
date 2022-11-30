const Wishlist = require('../../model/wishlist');
const Product = require('../../model/product');
const Cart = require('../../model/cart');

// view page controller

exports.getViewProductPage = (req, res, next) => {
  Cart.fetchAll((cartProducts) => {
    Wishlist.fetchAll((wishlistitems) => {
      Product.getProductDetailById(req.params.productID, (productData) => {
        return res.render('shop/view-product', {
          pageTitle: 'View Product',
          activeLink: '/',
          cartlength : cartProducts.length,
          productData,
          isInCart:
            cartProducts.filter(({ id }) => id === productData.id).length > 0,
          isInWishList:
            wishlistitems.filter(({ id }) => id === productData.id).length > 0,
        });
      });
    });
  });
};
