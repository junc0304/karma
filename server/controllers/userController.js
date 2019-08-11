const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class UserController {
  constructor(userDataHandler, postDataHandler, commentDataHandler) {
    this.userDataHandler = userDataHandler;
    this.postDataHandler = postDataHandler;
    this.commentDataHandler = commentDataHandler;
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
      let { userId, ...changes } = body;
      await this.userDataHandler.updateUser(body.userId, { ...changes });
      if (body.name) {
        await this.postDataHandler.updatePostUserName(body.userId, body.name);
        await this.commentDataHandler.updateCommentUserName(body.userId, body.name);
      }
    }
    catch (err) {
      console.log(err);
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