const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = new Schema({
    authorId: { type: String, required: true },
    contents: { type: String, required: true },
    status:   { type: String, required: true },
    created:  { type: Date, default: Date.now() },
    updated:  { type: Date },

    index:    { type: Number, required: true },
    post_id: { type: ObjectId, required: true},
});

module.exports = commentSchema;