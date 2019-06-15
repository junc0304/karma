const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class UserController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  async getUsers() {
    let result, users;
    try {
      //get users
      users = await this.userDataHandler.getUsers();
      console.log(users)
      result = { users: users };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getUserByEmailWithPassword(email) {
    let result, user;
    try {
      //get user with email
      user = await this.userDataHandler.getUserByEmailWithPassword(email);
      result = { user };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getUserById(userId) {
    let result, user;
    try {
      //get user with id
      user = await this.userDataHandler.getUserById(userId);
      result = { user };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createUser(userItem) {
    let result, user;
    try {
      //create new user
      await this.userDataHandler.createUser(userItem);
      user = await this.userDataHandler.getUserByEmail(userItem.email);
      result = { user };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async updateUser(user, { updates }) {
    let result, userData;
    try {
      //verify user
      const { userId, role } = user;
      if (!userId === _id && !role === 'admin') {
        throw "invalid request";
      }
      //update user and return updated user
      await this.userDataHandler.updateUser(userId, updates);
      userData = await this.userDataHandler.getUser(userId);
      result = { user: userData };
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async deleteUser(user, { userId }) {
    let result;
    try {
      //verify user
      const { userId, role } = user;
      if (!userId === _id && !role === 'admin') {
        throw "invalid request";
      }
      //delete user and return deleted user
      await this.userDataHandler.deleteUser(userId);
      result = { user };
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = UserController;