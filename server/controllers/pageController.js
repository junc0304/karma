const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PageController {
  constructor(pageDataHandler) {
    this.pageDataHandler = pageDataHandler;
  }

  async getPages() {
    let result;
    try {
      result = {
        page: await this.pageDataHandler.getPages()
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getPageByType(body) {
    let result;
    try {
      console.log("controller", body)
      result = {
        page: await this.pageDataHandler.getPageByType(body.type)
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createPage(user, body) {
    try {
      await this.pageDataHandler.createPage({
        ...page, type: body.type, authorId: "5cff7bcb668bd02340f3876b", authorName: "Jun" });
    } catch (err) {
      console.log(err)
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updatePage(body) {
    try {
      let { type } = body;
      delete body.type;
      console.log("update-controller", body);
      await this.pageDataHandler.updatePage(type, body);

    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deletePage(body) {
    try {
      await this.pageDataHandler.deletePage(body.type);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = PageController; 