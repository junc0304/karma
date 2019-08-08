const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PostController {
  constructor(postDataHandler, commentDataHandler) {
    this.postDataHandler = postDataHandler;
    this.commentDataHandler = commentDataHandler;
  }

  async getPostsByType(body) {
    let result;
    try {
      result = { 
        post:  await this.postDataHandler.getPostsByType(body.type)
      }
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

  async getNewPosts(body) {
    let result;
    try {
      let { days } = body;
      result = {
        type: [ ...await this.postDataHandler.getNewPosts(days)]
      };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createPost( user, body) {
    try {
      let { id, name } = user;
      let maxIndexItem = await this.postDataHandler.getItemWithMaxIndex( body.type );
      let nextIndex = 
        maxIndexItem.length > 0 ?  maxIndexItem[0].index + 1 : 1 ;
      await this.postDataHandler.createPost({
        ...body, index: nextIndex, authorId: id, authorName: name });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async updatePost(body) {
    try {
      let { postId } = body;
      delete body.postId;
      await this.postDataHandler.updatePostById( postId, {...body});
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }

  async deletePost(body) {
    try {  
      let {postId} = body;
      await this.commentDataHandler.deleteComments(postId);
      await this.postDataHandler.deletePost(postId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
  }
}

module.exports = PostController;