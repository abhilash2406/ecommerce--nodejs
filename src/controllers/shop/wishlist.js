const Wishlist = require('../../model/wishlist');
const Product = require('../../model/product');
const Cart = require('../../model/cart');


// display wishlist controller

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Wishlist.fetchAll((wishlsitProducts) => {
      Cart.fetchAll((cartitems) => {
        let formattedProducts = products.filter(({ id }) =>
          wishlsitProducts.map(({ id }) => id).includes(id)
        );
        formattedProducts = formattedProducts.map((p) => ({
          ...p,
          qty: wishlsitProducts.find(({ id }) => id === p.id).qty,
        }));

        res.render('shop/wishlist', {
          pageTitle: 'wishlist',
          products: formattedProducts,
          cartlength : cartitems.length,
          activeLink: '/wishlist',
        });
      });
    });
  });
};

 // add to wishlist 
exports.editwishList = (req, res, next) => {
  const productID = req.body.productID;
  Product.getProductDetailById(productID, (productDetails) => {
    Wishlist.addToWishList(productDetails, () => {
      res.redirect(`/products/${productID}`);
    });
  });
};

//remove from wishlist

exports.removeFromWishList = (req, res, next) => {
  const productID = req.body.productID;
  Wishlist.removeFromWishList(productID, () => {});
  res.redirect(`/wishlist`);
};
