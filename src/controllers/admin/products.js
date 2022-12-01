const Product = require('../../model/product');
const Cart = require('../../model/cart');
const WishList = require('../../model/wishlist');

const { v1: uuidv1 } = require('uuid');

// fetching edit form

exports.getEditProductPage = (req, res, next) => {
  Cart.fetchAll((cartProducts) => {
    let isEditable = false;
    if (req.params.productID) {
      isEditable = true;
    }
    if (!isEditable) {
      return res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        activeLink: 'admin/edit-product',
        isEditable: false,
        cartlength: cartProducts.length,
      });
    }

    // filling the edit form with data that to be changed

    Product.getProductDetailById(req.params.productID, (productData) => {
      return res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        activeLink: 'admin/edit-product',
        productData,
        cartlength: cartProducts.length,
        isEditable: true,
      });
    });
  });
};

//add product to shop by admin

exports.editProduct = (req, res, next) => {
  const { productId, title, price, image, description } = req.body;
  const product = new Product(
    productId ? productId : uuidv1(),
    title,
    price,
    image,
    description
  );

  if (productId) {
    product.update(() => {
      res.redirect('/admin/products');
    });
  } else {
    product.save(() => {
      res.redirect('/');
    });
  }
};

// delete product
exports.deleteConfirmProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.getProductDetailById(productID, (productdata) => {
    res.render('admin/confirm-dlt', {
      pageTitle: 'Delete Product',
      productdetails: productdata,
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const productID = req.params.productID;
  console.log(productID);
  Product.removeProduct(productID, () => {});
  Cart.removeFromCart(productID, () => {});
  WishList.removeFromWishList(productID, () => {});
  res.redirect(`/admin/products`);
};

//fetch all products

exports.getAllProducts = (req, res, next) => {
  Cart.fetchAll((cartProducts) => {
    Product.fetchAll((pdt) => {
      res.render('admin/list', {
        pageTitle: 'Admin List',
        cartlength: cartProducts.length,
        products: pdt,
        activeLink: '/admin/products',
      });
    });
  });
};
