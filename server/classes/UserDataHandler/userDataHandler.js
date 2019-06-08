const User = require('../../models/User');

class UserDataHandler {
  constructor(){
  }

  getUserById({userId}) {
    var result;
    try {
      result = await User.findById(userId);
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  getUserByEmail(email) {
    var result;
    try {
      result = await User.findOne({email});
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  createUser(UserItem) {
    var newUser; //result, 
    try {
      newUser = new User({...UserItem});
      await newUser.save();
      result = newUser;
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updateUser(userId, change) {
    var result;
    try{
      result = await User.findByIdAndUpdate(userId, {$set: {...change}});
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteUser(userId) {
    var result;
    try {
      result = await User.findByIdAndDelete(userId);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = UserDataHandler;