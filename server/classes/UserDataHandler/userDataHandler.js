const User = require('../models/User');

class UserDataHandler {
  constructor() {
  }
  getUser(userId) {
    var result;
    try {
      result = await User.findById(userId);
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  createUser(userItem) {
    var result;
    try {
      result = await new User({ ...userItem }).save();
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  updateUser(userId, updates) {
    var result;
    try {
      result = await User.findByIdAndUpdate(userId, { $set: { ...updates } });
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  deleteUser(userId) {
    var result;
    try {
      result = await User.findByIdAndDelete(userId);
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }
}

module.exports = UserDataHandler;