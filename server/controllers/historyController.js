const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class HistoryController {

  constructor(historyDataHandler) {
    this.historyDataHandler = historyDataHandler;
  }

  async getHistory() {
    let result;
    try {
      result = {
        history: await this.historyDataHandler.getAllHistory()
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createHistory(body) {
    try {
      await this.historyDataHandler.createHistory(body);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updateHistory(body) {
    try {
      let { historyId } = body;
      delete body.historyId;
      await this.historyDataHandler.updateHistoryById(historyId, { ...body });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deleteHistory(body) {
    try {
      let { historyId } = body;
      await this.historyDataHandler.deleteHistory(historyId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }


}

module.exports = HistoryController;