const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class UserController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  getUsers() {
    var result, data;
    try {
      data = this.userDataHandler.getUsers();
      result = {
        user: [...data]
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  getUser({ userId }) {
    var result, data;
    try {
      data = this.userDataHandler.getUser(userId);
      result = {
        user: [...data]
      }
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
    var result, data;
    try {
      this.userDataHandler.updateUser(userId, updates);
      data = this.userDataHandler.getUser(userId);
      result = {
        user: data
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteUser({ _id }, { userId }) {
    var result, data;
    try {
      if (!userId === _id) {
        throw new HttpExceptionHandler(400, 'invalid request');
      } else {
        data = this.userDataHandler.getUser(userId);
        this.userDataHandler.deleteUser(userId);
        result = {
          user: data
        }
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = UserController;