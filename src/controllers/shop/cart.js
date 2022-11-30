const Cart = require('../../model/cart');
const Product = require('../../model/product');

//controller to display cart

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.fetchAll((cartProducts) => {
      let formattedProducts = products.filter(({ id }) =>
        cartProducts.map(({ id }) => id).includes(id)
      );
      formattedProducts = formattedProducts.map((p) => ({
        ...p,
        qty: cartProducts.find(({ id }) => id === p.id).qty,
      }));

      

      let totalPrice = 0;
      cartProducts.map((cartProduct) => {
        const currentValue = cartProduct.price * cartProduct.qty;
        totalPrice = totalPrice + currentValue;
      });

      res.render('shop/cart', {
        pageTitle: 'cart',
        products: formattedProducts,
        activeLink: '/cart',
        totalPrice,
        cartlength : cartProducts.length,
      });
    });
  });
};

//add product to cart

exports.editCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.getProductDetailById(productID, (productDetails) => {
    Cart.addToCart(productDetails, () => {
      res.redirect(`/products/${productID}`);
    });
  });
};

//update cart item quantity

exports.updateCart = (req, res, next) => {
  const productID = req.body.productID;
  const isAdd = +req.body.isAdd;
  Cart.updateCart(productID, isAdd, () => {
    res.redirect(`/cart`);
  });
};

//remove item from cart

exports.removeFromCart = (req, res, next) => {
  const productID = req.body.productID;


  Cart._removeFromCart(productID, () => {});
  res.redirect(`/products/${productID}`);
};


