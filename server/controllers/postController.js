const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PostController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  async getPostsByType(body) {
    let result;
    try {
      result = { 
        post:  await this.postDataHandler.getPostsByType(body.type)
      }
      console.log(result)
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getPost(body) {
    let result;
    try {
      result = {
        post: await this.postDataHandler.getPostById(body.postId)
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createPost(/* user, */ body) {
    try {
      await this.postDataHandler.createPost({
        ...body/* , authorId: user.id, authorName: user.name  */});
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updatePost(body) {
    try {
      let { postId } = body;
      delete body.postId;
      
      console.log(postId, body)
      await this.postDataHandler.updatePostById( postId, {...body});
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deletePost(body) {
    try {
      await this.postDataHandler.deletePost(body.postId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = PostController;