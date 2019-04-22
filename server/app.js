const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./configuration');

mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
});

const app = express();
app.use(cors());

if(!process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
}

app.use(body_parser.json());

//user
app.use('/users', require('./routes/users'));
//board
app.use('/boards', require('./routes/boards'));

module.exports = app;
