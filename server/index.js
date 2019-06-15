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
const {DATABASE_URL, SERVER_PORT} = require('./configuration');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("global container", req.container)
  req.container = global.container;
  next();
});

app.use('/users', userRouter);
app.use('/boards', postRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);
app.use((req, res, err)=> {
  console.log(err);
  res.status(err.status).json({message: err.message});
})
const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => {
    console.log(`KARMA Server started..`,`PORT: ${port}` );
});