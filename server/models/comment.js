const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = new Schema({
    commentId:  { type: ObjectId },
    authorId:   { type: String, required: true },
    authorName: {type: String, required: true},
    content:    { type: String, required: true },
    status:     { type: String },
    created:    { type: Date, default: Date.now()},
    updated:    { type: Date },

    index:      { type: Number, required: true },
    postId:     { type: ObjectId, required: true},
});

commentSchema.pre('save', async function (next) {
  try {
    this.commentId = this._id;
    this.created = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});


const page = mongoose.model('comment', commentSchema);
module.exports = page;