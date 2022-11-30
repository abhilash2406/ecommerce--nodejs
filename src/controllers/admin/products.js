const Product = require('../../model/product');
const Cart = require('../../model/cart');

const { v1: uuidv1 } = require('uuid');

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
      cartlength : cartProducts.length,
    });
  }

  Product.getProductDetailById(req.params.productID, (productData) => {
    
    return res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      activeLink: 'admin/edit-product',
      productData,
      cartlength : cartProducts.length,
      isEditable: true,

    });
  });
});
  
};

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
      res.redirect('/');
    });
  } else {
    product.save(() => {
      res.redirect('/');
    });
  }
};

exports.getAllProducts = (req, res, next) => {
  Cart.fetchAll((cartProducts) => {
  Product.fetchAll((pdt) => {
    res.render('admin/list', {
      pageTitle: 'Admin List',
      cartlength : cartProducts.length,
      products: pdt,
      activeLink: '/admin/products',
    });
  });
  });
};
