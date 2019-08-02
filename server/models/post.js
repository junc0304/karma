const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Config = require('../configuration');

const postSchema = new Schema({
    postId:       { type: ObjectId, unique: true},
    type:         { type: String, enum: Config.BOARD_TYPE, required: true },
    index:        { type: Number, required: true },
    title:        { type: String, required: true },
    content:      { type: String, required: true },
    authorId:     { type: ObjectId, required: true },
    authorName:   { type: String, required: true },
    created:      { type: Date, defalut: Date.now() },
    updated:      { type: Date },
    comments:     [{ type: ObjectId }], //comment schema
});

postSchema.pre('save', async function (next) {
  try {
    this.postId = this._id;
    this.created = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

postSchema.pre('updateOne', async function (next) {
  try {
    this.updated = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

postSchema.method.isValidPassword = async function (password) {
  try {
    return await password === this.password;
  }
  catch (error) {
    throw new Error(error);
  }
}

const Post = mongoose.model('post', postSchema);
module.exports = Post;