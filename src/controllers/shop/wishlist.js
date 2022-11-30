const Wishlist = require('../../model/wishlist');
const Product = require('../../model/product');

exports.getViewProductPage = (req, res, next) => {
  let isIncluded = false;
  Wishlist.fetchAll((id) => {
    if (req.params.productID) {
      isIncluded = true;
    }
  });

  Product.getProductDetailById(req.params.productID, (productData) => {
    return res.render('shop/view-product', {
      pageTitle: 'View Product',
      activeLink: '/',
      productData,
      isIncluded,
    });
  });
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Wishlist.fetchAll((wishlsitProducts) => {
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
        activeLink: '/wishlist',
      });
    });
  });
};

exports.editwishList = (req, res, next) => {
  const productID = req.body.productID;
  Product.getProductDetailById(productID, (productDetails) => {
    Wishlist.addToWishList(productDetails, () => {
      res.redirect(`/`);
    });
  });
};


exports.removeFromWishList = (req, res, next) => {
  const productID = req.body.productID;
  Wishlist._removeFromWishList(productID, () => {});
  res.redirect(`/wishlist`);
};
