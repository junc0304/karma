const User = require('../../models/user');

class UserDataHandler {
  constructor() {
  }

  async getUsers() {
    var result;
    try {
      result = await User.find({});
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getUserById(userId) {
    var result;
    try {
      result = await User.findOne({userId});
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async foundEmail(email) {
    var foundUser;
    try {
      foundUser = await User.findOne({ email });
      if (foundUser) {
        return true;
      }
      return false;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmailWithPassword(email) {
    var result
    try {
      result = await User.findOne({ email }).select("+password");
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getUserByEmail(email) {
    var result;
    try {
      result = await User.findOne({ email });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createUser(formItem) {
    var newUser;
    try {
      newUser = await new User({ ...formItem });
      await newUser.save();
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(userId, changes) {
    try {
      await User.updateOne({ userId }, { $set: { ...changes } });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(userId) {
    try {
      await User.deleteOne({ userId });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserDataHandler;