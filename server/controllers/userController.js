const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class UserController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  async getUsers() {
    let result;
    try {
      result = {
        user: await this.userDataHandler.getUsers()
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getUserById(body) {
    let result;
    try {
      result = { 
        user: await this.userDataHandler.getUserById(body.userId) 
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createUser(body) {
    try {
      await this.userDataHandler.createUser(body);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updateUser(body) {
    try {
      await this.userDataHandler.updateUser(
        body.userId, 
        { ...body.updates, 
          updated: Date.now() });
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deleteUser(body) {
    try {
      await this.userDataHandler.deleteUser(body.userId);
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = UserController;