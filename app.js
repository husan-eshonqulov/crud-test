const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homeRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => console.log('3000 port listening...'));
