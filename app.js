require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const breadcrumbs = require('express-breadcrumbs');
const fetchCategories = require('./middlewares/categories');
const { checkUser } = require('./middlewares/userCheck');

const app = express();

// Setting the Session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}));
  
// required modules
const connectDB = require('./config/db');
const initializeSoapClient = require('./config/soapClient');

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

//
app.use(fetchCategories);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Breadcrumb
app.use(expressLayouts);
app.use(breadcrumbs.init());
app.use('/', breadcrumbs.setHome());
app.set('layout', 'layout');

app.get('*', checkUser);

//Routes
const firstRouter = require('./routes/product');
app.use(firstRouter);
const authRouter = require('./routes/auth');
app.use(authRouter);

// Initialize  connections
connectDB();
initializeSoapClient().then(soapClient => {
	app.set('soapClient', soapClient);
});

app.listen(3000, () => console.log('Server is started...'));

module.exports = app;
