const Post = require('../../models/post');
const Comment = require('../../models/comment');

class PostDataHandler {
  constructor() {
  }

  async getCommentsByPostId(postId) {
    var result;
    try {
      result = await Post.findOne({ postId }, "comments");
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getItemWithMaxIndex(type) {
    var result;
    try {
      result = await Post.find({ type }).sort({ index: -1 }).limit(1);
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async addCommentToPost(postId, commentId) {
    try {
      await Post.findOneAndUpdate({ postId }, { $push: { comments: commentId } });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async getNewPosts(days) {
    var result, date;
    try {
      date = new Date();
      date.setDate(date.getDate() - days);
      result =
        await Post.find({ created: { $gt: date } })
          .distinct('type', function (err, types) { [types] });
    }
    catch (err) {
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
      result = await Post.findOne({ postId });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getPostsByType(type) {
    var result;
    try {
      result = await Post.find({ type }).sort({ created: -1 });
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

  async updatePostUserName(userId, name) {
    try {
      await Post.updateMany({ authorId:userId }, { $set: { authorName: name } });
    }
    catch (err) {
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

  async deleteCommentInPost(postId, commentId) {
    try {
      await Post.findOneAndUpdate({ postId }, { $pull: { comments: commentId } });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PostDataHandler;