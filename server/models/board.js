const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const config = require('../configuration');

const boardSchema = new Schema({
    board_type: { type: String, enum: config.BOARD_TYPE, required: true },
    index: { type: Number, required: true },
    title: { type: String, required: true },
    contents: { type: String },
    author_name: {type: String, required: true},
    author_id: {type: ObjectId, required: true},
    password: { type: String, required: true, select: false },
    created: { type: Date, defalut: Date.now() },
    updated: { type: Date },
    comments_count: { type: Number, default: 0 },

    //references
    user_id: { type: ObjectId, ref: 'User' },
    comment_id: [{ type: ObjectId, ref: 'Comment' }],
    
});
boardSchema.index({'board.title' : 'text', 'board.contents' : 'text', 'board.author_name' : 'text'});

boardSchema.pre('save', async function (next) {
    try {
        //this.index = await Board.findOne({ board_type: board_type }, 'board.index')
        //    .sort('-board.index')
        //    .then((result) => {
        //        if (result) {
        //            console.log('board index', result.index);
        //            return result.index + 1;
        //        }
        //        return 1;
        //    });

        this.created = Date.now();
        next();
    }
    catch (error) {
        next(error);
    }
});

boardSchema.pre('updateOne', async function (next) {
    try {
        this.updated = Date.now();
        next();
    }
    catch (error) {
        next(error);
    }
});

boardSchema.method.isValidPassword = async function (password) {
    try {
        return await password === this.password;
    }
    catch (error) {
        throw new Error(error);
    }
}

const Board = mongoose.model('board', boardSchema);
module.exports = Board;