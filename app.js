const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const breadcrumbs = require('express-breadcrumbs');
const mongoose = require('mongoose');
const fetchCategories = require('./middlewares/categories');
const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

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
app.use(breadcrumbs.init());
app.use("/",breadcrumbs.setHome());
app.set('layout', 'layout');

//Routes
const firstRouter = require('./routes/index');
app.use(firstRouter);

//Soap
let soapClient;
async function initializeSoapClient() {
    try {
        soapClient = await soap.createClientAsync(url);
        app.set('soapClient', soapClient);
        console.log('SOAP Client is ready to be used');
    } catch (err) {
        console.error(err);
    }
}

initializeSoapClient();

//Database Connection 
mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server is started...')
);
module.exports = app;

