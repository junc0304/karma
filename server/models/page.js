const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Config = require('../configuration');

const pageSchema = new Schema({
    type:         { type: String, enum: Config.PAGE_TYPE, required: true },
    title:        { type: String, required: true },
    contentHeader:{ type: String },
    content:      { type: String, required: true },
    authorId:     { type: ObjectId, required: true},
    authorName:   { type: String, required: true},
    updated:      { type: Date },
});

pageSchema.pre('save', async function (next) {
  try {
    this.updated = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

pageSchema.pre('updateOne', async function (next) {
  try {
    this.updated = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

const page = mongoose.model('page', pageSchema);
module.exports = page;