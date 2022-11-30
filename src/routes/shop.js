const express = require('express');

const router = express.Router();

const productsController = require('../controllers/shop/products');

const wishlistController = require('../controllers/shop/wishlist');

const cartController = require('../controllers/shop/cart');

router.get('/', productsController.getAllProducts);

router.get('/cart', cartController.getAllProducts);

router.get('/wishlist', wishlistController.getAllProducts);

router.post('/add-to-cart', cartController.editCart);

router.post('/update-cart', cartController.updateCart);

router.post('/remove-from-cart', cartController.removeFromCart);

router.get('/products/:productID', wishlistController.getViewProductPage);

router.post('/add-to-wishlist', wishlistController.editwishList);

router.post('/remove-from-wishlist', wishlistController.removeFromWishList);

module.exports = router;
