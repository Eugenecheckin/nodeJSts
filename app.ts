const express = require('express');
const bodyParser = require('body-parser')

const authRoute = require('./routes/auth.ts');
const userRoute = require('./routes/user.ts');

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use('/Auth', authRoute);
app.use('/User', userRoute);

module.exports = app;