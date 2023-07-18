const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/authController');

router.get('/signUp' ,userAuth.userSignup_get);
router.post('/signUp' ,userAuth.userSignup_post);
    
module.exports = router;
