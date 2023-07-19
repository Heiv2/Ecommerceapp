const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/authController');

router.get('/signUp' ,userAuth.userSignup_get);
router.post('/signUp' ,userAuth.userSignup_post);
router.post('/logIn',userAuth.userLogIn);
router.get('/logout', userAuth.logOut);
    
module.exports = router;
