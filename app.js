const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');


const app = express();
app.use(express.json());

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
const firstRouter = require('./routes/index');
app.use(firstRouter);
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(3000, () => console.log('Server is started...'));
module.exports = app;