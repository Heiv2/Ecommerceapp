"use strict";
const userModel = require('../models/products');
const User = require('../models/users');

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
      const user = await User.create({ email, password});
      res.status(201).json(user);
      
   }
   catch (err){  
      
      const errors = handleErrors(err);
      res.status(400).json({ errors });
   }
}
