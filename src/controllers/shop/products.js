const Product = require('../../model/product');
const Cart = require('../../model/cart');
const WishList = require('../../model/wishlist')

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.fetchAll((cartProducts) => {
      WishList.fetchAll((wishlistitems)=>{
res.render('shop/shop', {
        pageTitle: 'Shop',
        products: products.map((product) => ({
          ...product,
          isInCart:
            cartProducts.filter(({ id }) => id === product.id).length > 0,
            isInWishList :
            wishlistitems.filter(({id})=> id ===product.id).length > 0,
        })),

        activeLink: '/',
      });
    });
    });
  });
};
