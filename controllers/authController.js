'use strict';

const User = require('../models/users');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	// handle duplicate error
	if (err.code === 11000) {
		errors.email = 'that email is already registered';
	}

	// incorrect email
	if (err.message === 'Incorrect Email Entered') {
		errors.email = 'That Email is not registered';
	}		

	// incorrect password
	if (err.message === 'Incorrect Password') {
		errors.password = 'That password is incorrect';
	}

	// validation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	
	// Mongoose validation errors for password and email regex
	if (err.name === 'ValidationError') {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}
	
	return errors;
};


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: maxAge
	});
};

exports.userSignup_get = function (req, res) {
	req.breadcrumbs('Registration');
	res.render('signUp', {
		title: 'SignUp Page',
		breadcrumbs: req.breadcrumbs(),
	});
};

exports.userSignup_post = async function (req, res) {
	const { email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ errors: { password: 'Passwords do not match.' } });
	}

	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		req.session.jwt = token;
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

exports.userLogIn = async function (req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		req.session.jwt = token;
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

exports.logOut = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}

		res.redirect('/');
	});
};