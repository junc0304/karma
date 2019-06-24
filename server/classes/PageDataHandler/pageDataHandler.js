const Page = require('../../models/page');

class PageDataHandler {
  constructor() {
  }

  async getPages() {
    var result;
    try {
      result = await Page({});
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getPageByType(type) {
    var result;
    try {
      console.log("getPageByType")
      result = await Page.findOne({ type: type });
      console.log("aaa",result);
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createPage(pageItem) {
    var newPage;
    try {
      newPage = await new Page({ ...pageItem });
      await newPage.save();

    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updatePage(type, updates) {
    try {
      console.log(type, updates)
      await Page.updateOne({ type }, { $set: { ...updates } },{upsert: true});
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async deletePage(type) {
    try {
      await Page.deleteOne({ type });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PageDataHandler;