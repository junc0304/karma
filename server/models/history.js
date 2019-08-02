const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const historySchema = new Schema({
  historyId: { type: ObjectId, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },

  year: { type: Number, required: true },
  month: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], required: true },
  created: { type: Date, defalut: Date.now() },
  updated: { type: Date, defalut: Date.now() },
});

historySchema.pre('save', async function (next) {
  try {
    this.historyId = this._id;
    this.created = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

historySchema.pre('updateOne', async function (next) {
  try {
    this.updated = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

historySchema.method.isValidPassword = async function (password) {
  try {
    return await password === this.password;
  }
  catch (error) {
    throw new Error(error);
  }
}

const History = mongoose.model('history', historySchema);
module.exports = History;