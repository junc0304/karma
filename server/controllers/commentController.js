const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class CommentController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  async getComment({postId, commentId}) {
    var result;
    try {
      result = await this.postDataHandler.getComment(postId, commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createComment({postId, comment}) {
    var result, postId;
    try {
      postId = commentItem.postId;
      delete commentItem.postId;
      result = this.postDataHandler.createComment(postId, comment);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updateComment(userId, {commentId, postId, updates}) {
    var result;
    try {
      result = this.postDataHandler.updateComment(userId, postId, commentId, updates);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteComment(userId, {commentId, postId} ) {
    var result;
    try {
      result = postDataHandler.deleteComment(userId, postId, commentId);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = CommentController;