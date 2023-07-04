const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js')
router.get('/', (req,res) =>{
    res.send("Hello World zort asd");
})
module.exports = router;