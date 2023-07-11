const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fetchCategories = require('./middlewares/categories');

const app = express();

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fetchCategories);
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');

//Routes
const firstRouter = require('./routes/index');
app.use(firstRouter);


//Database Connection 
mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server is started...'));
module.exports = app;
