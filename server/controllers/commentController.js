const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class CommentController {
  constructor(commentDataHandler) {
    this.commentDataHandler = commentDataHandler;
  }

  async getComments(body) {
    var result;
    try {
      result = { 
        comment: await this.commentDataHandler.getComments(body.postId)
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createComment(body) {
    try {
      await this.commentDataHandler.createComment(body.comment);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updateComment(body) {
    try {
      await this.commentDataHandler.updateComment(body.commentId, body.updates);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deleteComment(body) {
    try {
      await this.commentDataHandler.deleteComment(body.commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = CommentController;