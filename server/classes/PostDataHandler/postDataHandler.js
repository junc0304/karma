const Post = require('../../models/post');
const Comment = require('../../models/comment');

class PostDataHandler {
  constructor() {
  }

  async searchPosts(condition) {
    var result;
    try {
      result = await Post.find({ ...condition });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }
  async getPostById(postId) {
    var result;
    try {
      result = await Post.findOne({postId});
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getPostsByType(type) {
    var result;
    try {
      result = await Post.find({ type });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createPost(postItem) {
    var newPost;
    try {
      newPost = await new Post({ ...postItem });
      await newPost.save();
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updatePostById(postId, updates) {
    try {
      await Post.updateOne({ postId }, { $set: { ...updates } });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async deletePost(postId) {
    try {
      await Post.findOne({ postId });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PostDataHandler;