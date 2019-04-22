const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const config = require('../configuration');
const Board = require('./board');

const commentSchema = new Schema({
    //basic items
    author: { type: String, required: true },
    contents: { type: String, required: true },
    //status
    status: {
        type: String,
        enum: ['normal', 'hidden', 'deleted'],
        default: 'normal',
        required: true,
    },
    //log
    created: { type: Date, default: Date.now() },
    updated: { type: Date },

    //references
    index: { type: Number, required: true },
    board_id: { type: ObjectId, required: true, ref: 'Board' },
    user_id: { type: ObjectId, required: true, ref: 'User' },
});


commentSchema.pre('save', async function (next) {
    try {
        this.created = Date.now();
        next();
    }
    catch (error) {
        next(error);
    }
})

commentSchema.post('save', async function (next) {
    try {
        next();
    }
    catch (error) {
        next(error);
    }
})

commentSchema.pre('updateOne', async function (next) {
    try {
        this.updated = Date.now();
    }
    catch (error) {
        next(error);
    }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;