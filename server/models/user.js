const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;
const { USER_ROLES } = require('../configuration');

const userSchema = new Schema({
  userId:     { type: ObjectId},
  name:       { type: String, required: true },
  email:      { type: String, lowercase: true, required: true, unique: true },
  password:   { type: String, required: true, select: false },
  depotName:  { type: String, required: true },
  phone:      { type: Number },
  address:    { type: String },
  unit:       { type: String },
  city:       { type: String, enum:[] },
  province:   { type: String, default: "BC" },
  postalCode: { type: String },
  role:       { type: String, enum: [USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.OWNER], default: USER_ROLES.USER },
  notify:     { type: Boolean, default: false },
  created:    { type: Date, default: Date.now()},
  updated:    { type: Date },
  comment:    { type: String },
});

userSchema.pre('save', async function (next) {
  try {
    this.userId = this._id;
    var salt = await bcrypt.genSalt(13);
    var passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  }
  catch (error) {
    next(error);
  }
});

userSchema.pre('updateOne', async function (next) {
  try {
    var updates = this.getUpdate();
    if (typeof updates.$set == 'undefined'||!updates.$set.password) {
      return next();
    }
    var salt = await bcrypt.genSalt(13);
    var passwordHash = await bcrypt.hash(updates.$set.password, salt);
    this.getUpdate().$set.password = passwordHash;
    this.getUpdate().$set.updated = Date.now();
    next();
  }
  catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  }
  catch (error) {
    return new Error(error);
  }
}

userSchema.methods.hidePassword = async function (next) {
  try {
    this.password = null;
    next();
  }
  catch (error) {
    return new Error(error);
  }
}

const User = mongoose.model('user', userSchema);
module.exports = User;