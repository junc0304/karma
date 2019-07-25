const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const _ = require('./ioc');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const authRouter = require('./routes/auth');
const pageRouter = require('./routes/page');
const {DATABASE_URL, SERVER_PORT} = require('./configuration');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex : true ,useFindAndModify: false });

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.container = global.container;
  next();
});


app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/page', pageRouter);
app.use('/auth', authRouter);

app.use((error, req, res, next) =>{

  res.json({ message: error.message });
})

const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => {
    console.log(`KARMA Server started..`,`PORT: ${port}` );
});