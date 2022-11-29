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

exports.editWishlist = (req, res, next) => {
  const productID = req.params.productID;
  let { productId } = req.body;
  const wishlist = new Wishlist(productID);

  //console.log(req.body);

  if (productId) {
    wishlist.update(() => {
      res.redirect(`/products/${productID}`);
    });
  } else {
    wishlist.save(() => {
      res.redirect(`/products/${productID}`);
    });
  }
};
