const express = require('express');
const app = express();

app.use(express.json());

const firstRouter = require('./routes/index')
app.use(firstRouter);

app.listen(3000, () => console.log('Server is started...'))