const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class UserController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  getUser({ userId }) {
    var result;
    try {
      result = this.userDataHandler.getUser(userId)
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createUser({ user }) {
    var result;
    try {
      result = this.userDataHandler.createUser(user)
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updateUser(userId, { updates }) {
    var result;
    try {
      result = this.userDataHandler.updateUser(userId, updates)
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteUser({ _id }, { userId }) {
    var result;
    try {
      if (!userId === _id) {
        throw new HttpExceptionHandler(400, 'invalid request');
      } else {
        result = this.userDataHandler.deleteUser(userId);
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = UserController;