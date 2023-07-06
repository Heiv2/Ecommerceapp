const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
const product = require("../models/product.js")

router.get('/', controller.test);

module.exports = router;
