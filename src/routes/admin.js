const express = require('express');

const router = express.Router();

const productsController = require('../controllers/admin/products');

router.get('/edit-product/:productID', productsController.getEditProductPage);

// to edit product
router.get('/edit-product', productsController.getEditProductPage);

// add product
router.post('/edit-product', productsController.editProduct);

// to delete product
router.get(
  '/delete-product-confirm/:productID',
  productsController.deleteConfirmProduct
);

// delete
router.post('/delete/:productID', productsController.deleteProduct);

//get all products
router.get('/products', productsController.getAllProducts);

module.exports = router;
