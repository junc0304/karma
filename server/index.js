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
const historyRouter = require('./routes/history');
const {DATABASE_URL, SERVER_PORT, CLIENT_ORIGIN} = require('./configuration');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, { 
  useNewUrlParser: true, 
  useCreateIndex : true ,
  useFindAndModify: false 
});

app.use(cookieParser());
app.use(cors({
  origin: CLIENT_ORIGIN,
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
app.use('/history', historyRouter)
app.use('/page', pageRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => {
  console.log(CLIENT_ORIGIN);
    console.log(`KARMA Server started..`,`PORT: ${port}` );
});