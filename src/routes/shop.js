const express = require('express');

const router = express.Router();

const productsController = require('../controllers/shop/products');

const wishlistController = require('../controllers/shop/wishlist');

const cartController = require('../controllers/shop/cart');

const viewPageController = require('../controllers/shop/viewpage');

// get all products
router.get('/', productsController.getAllProducts);

// get all products from cart
router.get('/cart', cartController.getAllProducts);

// fetch all products that present in wish list
router.get('/wishlist', wishlistController.getAllProducts);

// add product to cart
router.post('/add-to-cart', cartController.editCart);

// edit no of items in cart
router.post('/update-cart', cartController.updateCart);

// remove item from cart
router.post('/remove-from-cart', cartController.removeFromCart);

// item view page
router.get('/products/:productID', viewPageController.getViewProductPage);

// add product to wish list 
router.post('/add-to-wishlist', wishlistController.editwishList);

// remove product from wish list
router.post('/remove-from-wishlist', wishlistController.removeFromWishList);

module.exports = router;
