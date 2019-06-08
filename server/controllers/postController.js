const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PostController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  getAllByType({ type }) {
    var result, data;
    try {
      data = this.postDataHandler.getPosts({ type: type });
      result = {
        type: type,
        data: data,
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  getPost({ postId }) {
    var result, data;
    try {
      data = this.postDataHandler.getPost(postId);
      result = {
        type: data.type,
        data: data,
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createPost({ post }) {
    var result, data;
    try {
      data = this.postDataHandler.createPost(post);
      result= {
        type: data.type,
        data: data
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updatePost(userId, { postId, updates }) {
    var result, data;
    try {
      this.postDataHandler.updatePost(userId, postId, updates);
      data = this.postDataHandler.getPost(postId);
      result = {
        type: data.type,
        data: data
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deletePost(userId, { postId }) {
    var result, data;
    try {
      data = this.postDataHandler.getPost(postId);
      this.postDataHandler.deletePost(userId, postId);
      result = {
        type: data.type,
        data: data
      }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = PostController;