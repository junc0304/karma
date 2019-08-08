const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class CommentController {
  constructor(commentDataHandler, postDataHandler) {
    this.commentDataHandler = commentDataHandler;
    this.postDataHandler = postDataHandler;
  }

  async getComments(body) {
    var result;
    try {
      result = { 
        comment: await this.commentDataHandler.getComments(body.postId),
        postId: body.postId
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createComment(user, body) {
    try {
      let { postId, content } = body;
      let { userId, name } = user;
      await this.commentDataHandler.createComment({ authorId: userId, authorName: name, postId, content });
      let { commentId } = await this.commentDataHandler.searchComment({authorId: userId, authorName: name, postId, content });
      await this.postDataHandler.addCommentToPost(postId, commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updateComment(body) {
    try {
      let { commentId } = body;
      delete body[commentId];
      await this.commentDataHandler.updateComment(commentId, body);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deleteComment(body) {
    try {
      let {commentId, postId} = body
      await this.commentDataHandler.deleteComment(commentId);
      await this.postDataHandler.deleteCommentInPost(postId, commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

}

module.exports = CommentController;