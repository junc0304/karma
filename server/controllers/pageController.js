const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PageController {
  constructor(pageDataHandler) {
    this.pageDataHandler = pageDataHandler;
  }

  async getPages() {
    let result;
    try {
      result = { page: await this.pageDataHandler.getPages()};
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getPageByType(body) {
    let result;
    try {
      result = { page : await this.pageDataHandler.getPageByType(body.type) };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createPage(user, body) {
    try {
      let { userId, name } = user;
      await this.pageDataHandler.createPage({ ...body, authorId: userId, authorName: name });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updatePage(body) {
    try {
      let { type, ...update} = body;
      await this.pageDataHandler.updatePage(type, update);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deletePage(body) {
    try {
      let {type} = body;
      await this.pageDataHandler.deletePage(type);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = PageController; 