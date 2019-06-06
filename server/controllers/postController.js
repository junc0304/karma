const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PostController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  getPost({postId}) {
    var result;
    try {
      result = this.postDataHandler.getPost(postId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createPost({post}) {
    var result;
    try {
      result = this.postDataHandler.createPost(post);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updatePost(userId, { postId, updates }) {
    var result;
    try{
      result = this.postDataHandler.updatePost(userId, postId, updates);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deletePost(userId, { postId }) {
    var result;
    try {
      result = PostDataAdapter.deleteProfile(userId, postId );
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = PostController;