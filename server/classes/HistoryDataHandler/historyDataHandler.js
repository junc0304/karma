const History = require('../../models/history');

class HistoryDataHandler {
  constructor() {
  }

  async getAllHistory() {
    var result;
    try {
      result = await History.find().sort({ year: -1, month: -1 });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createHistory(historyItem) {
    var newHistory;
    try {
      newHistory = await new History({ ...historyItem });
      await newHistory.save();
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updateHistoryById(historyId, updates) {
    try {
      await History.updateOne({ historyId }, { $set: { ...updates } });
    }
    catch (err) {
      console.log(err)
      throw new Error(err);
    }
  }

  async deleteHistory(historyId) {
    try {
      await History.deleteOne({ historyId });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async deleteCommentInHistory(historyId, commentId) {
    try {
      await History.findOneAndUpdate({ historyId }, { $pull: { comments: commentId } });
    }
    catch (err) {
      throw new Error(err);
    }
  }



}

module.exports = HistoryDataHandler;