const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController.js');
const categoryController = require('../controllers/categoryController.js');
const productController = require('../controllers/productController.js');

router.get('/', controller.home);
router.get('/category/:categoryId', categoryController.getCategoryById);
router.get('/products/:cid', productController.getplpById);
router.get('/product/:productId', productController.getSingleProduct);

module.exports = router;
