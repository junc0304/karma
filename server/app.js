const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./configuration');

mongoose.Promise = global.Promise;

let dbUrl = 'mongodb://db:27017/karma';

mongoose.connect('mongodb://db:27017/karma', { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
});

const app = express();
app.use(cors());

if(!process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}

app.use(body_parser.json());

//user
app.use('/users', require('./routes/users'));
//board
app.use('/boards', require('./routes/boards'));

module.exports = app;
