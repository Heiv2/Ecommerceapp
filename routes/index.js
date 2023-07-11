const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
const categoryController = require('../controllers/categoryController.js');
const productController = require('../controllers/productController.js');

router.get('/', controller.test);
router.get('/category/:categoryId', categoryController.getCategoryById);
router.get('/categories/:categoryName', categoryController.getCategoryByName);
router.get('/products/:cid', productController.getproductById);
router.get('/product/:productId', productController.getSingleProduct);
module.exports = router;
