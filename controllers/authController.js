"use strict";

const User = require('../models/users');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {  
   console.log(err.message, err.code);
   let errors = {email:'', password: ''}

   // handle duplicate error
   if (err.code === 11000){
      errors.email = 'that email is already registered';
   }

   // validation errors
   if (err.message.includes('User validation failed')){
      Object.values(err.errors).forEach(({properties}) =>{
         errors[properties.path] = properties.message;
      });   
   }
   return errors;
}

const maxAge = 3* 24 * 60 * 60;
const createToken = (id) => {
   return jwt.sign({ id }, process.env.TOKEN_KEY,{
      expiresIn: maxAge
   });
}

exports.userSignup_get = function(req,res){
   req.breadcrumbs("Registration");
   res.render("signUp",{
    title:"SignUp Page",
    breadcrumbs: req.breadcrumbs()
   });
}

exports.userSignup_post = async function(req,res){
   const {email, password, confirmPassword} = req.body;

   if(password !== confirmPassword){
      return res.status(400).json({ errors: {password: 'Passwords do not match.'} });
   }

   
   try{
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000 });
      res.status(201).json({user: user._id});
      
   }
   catch (err){  
      const errors = handleErrors(err);
      res.status(400).json({ errors });
   }
}
