const Product = require('../../model/product');
const Cart = require('../../model/cart');

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.fetchAll((cartProducts) => {
      // console.log(cartProducts);
      res.render('shop/shop', {
        pageTitle: 'Shop',
        products: products.map((product) => ({
          ...product,
          isInCart:
            cartProducts.filter(({ id }) => id === product.id).length > 0,
        })),

        activeLink: '/',
      });
    });
  });
};
