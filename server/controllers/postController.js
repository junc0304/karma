const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class PostController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  async getPostsByType(type) {
    let result, data;
    try {
      //get data
      data = await this.postDataHandler.getPostsByType(type);
      //console.log(data[0], type)
      result = { type, data };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async getPost({ postId }) {
    let result, data;
    try {
      //get data
      data = await this.postDataHandler.getPostById(postId);
      result = { type: data.type, data }
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async createPost(user, postItem) {
    let result, postId, data;
    try {
      //add author info from user info
      postItem.authorId = user.id,
      postItem.authorName = user.name
      
      //craete new post
      postId = await this.postDataHandler.createPost(postItem);
      data = await this.postDataHandler.getPostById(postId);
      result = { type: data.type, data };
      console.log(data)
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async updatePost(user, { postId, updates }) {
    let result, data;
    try {
      //check permission
      let { userId, role } = user;
      let { authorId, type } = await this.postDataHandler.getPostById(postId);
      if (!role === 'admin' || !authorId || !authorId === userId) {
        throw "Cannot update";
      }
      //update post
      await this.postDataHandler.updatePost(postId, updates);
      data = await this.postDataHandler.getPost(postId);
      result = { type, data };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async deletePost(user, { postId }) {
    let result, data, post;
    try {
      //check permission
      post = await this.postDataHandler.getPostById(postId);
      let { userId, role } = user;
      let { authorId } = post;
      if (!role === 'admin' || !authorId || !authorId === userId) {
        throw "Cannot delete"
      }
      //delete post and return origianl post
      data = await this.postDataHandler.getPost(postId);
      await this.postDataHandler.deletePost(userId, postId);
      result = { type, data };
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = PostController;