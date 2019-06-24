const Post = require('../../models/post');
const Comment = require('../../models/comment');

class PostDataHandler {
  constructor() {
  }

  async getRecentPosts() {
    var result, date;
    try {
      //get date of 5 days ago
      date = new Date();
      date.setDate(date.getDate() -5);
      result = await Post.find({created:{$gt: date }}).sort({type: -1, created:-1});
    }
    catch {
      throw new Error(err);
    }
    return result;
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
      result = await Post.find({ type }).sort({created:-1});
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
      console.log(err)
      throw new Error(err);
    }
  }

  async deletePost(postId) {
    try {
      await Post.deleteOne({ postId });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PostDataHandler;