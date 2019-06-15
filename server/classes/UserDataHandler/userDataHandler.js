const User = require('../../models/user');

class UserDataHandler {
  constructor() {
  }

  async getUsers() {
    var result;
    try {
      result = await User.find({});
      console.log(result)
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getUserById(userId) {
    var result;
    try {
      result = await User.findById(userId);
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async foundEmail(email) {
    var result, foundUser;
    try {
      foundUser  = await User.findOne({email});
      if (foundUser) return true;
      return false;
    }
    catch (err) {
      throw new Error(err);
    }
  }
  
  async getUserByEmailWithPassword(email) {
    var result
    try {
      result =  await User.findOne({ email }).select("+password");
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getUserFromEmail(email) {
    var result, userFound;
    try {
      result = await User.findOne({ email });
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createUser(formItem) {
    var newUser, result;
    try {
      newUser = await new User({ ...formItem });
      await newUser.save();
      result = newUser;
    } 
    catch (err) {
      throw new Error(err);
    } 
    return result;
  }

  async updateUser(userId, changes) {
    var result;
    try {
      result = await User.findByIdAndUpdate( userId, { $set: { ...changes } });
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async deleteUser(userId) {
    var result;
    try {
      result = await User.findByIdAndDelete(userId);
    } 
    catch (err) {
      throw new Error(err);
    }
    return result;
  }
}

module.exports = UserDataHandler;