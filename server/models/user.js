const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { USER_ROLES } = require('../configuration');
const { ADMIN, USER, OWNER } = USER_ROLES;

const userSchema = new Schema({
  name:       { type: String },
  email:      { type: String, lowercase: true },
  password:   { type: String, select: false },
  depotName:  { type: String },
  address1:   { type: String },
  unit:       { type: String },
  city:       { type: String },
  province:   { type: String },
  postalCode: { type: String },
  role:       { type: String, enum: [ADMIN, USER, OWNER], default: USER },
  notify:     { type: Boolean, default: false },
  created:    { type: Date, default: Date.now()},
  updated:    { type: Date },
  comment:{ type: String },
});

userSchema.pre('save', async function (next) {
  try {
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