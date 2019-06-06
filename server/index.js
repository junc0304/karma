const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const authRouter = require('./routes/auth');
const {DATABASE_URL, SERVER_PORT} = require('./configuration');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.container = global.container;
  next();
});

app.use('/users', userRouter);
app.use('/boards', postRouter);
app.use('/comment', commentRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => {
    console.log(`KARMA Server started..`,`PORT: ${port}` );
});