const Post = require('../../models/post');
const Comment = require('../../models/comment');

class PostDataHandler {
  constructor() {
  }
  //post
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
      result = await Post.findById(postId);
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async getPostsByType(type) {
    var result;
    try {
      result = await Post.find({ type: type });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createPost(postItem) {
    var result, newPost;
    try {
      console.log("createPost",postItem);
      newPost = await new Post({ ...postItem });
      console.log(newPost)
      await newPost.save();
      result = newPost.id;
    }
    catch (err) {
      console.log(err)
      throw new Error(err);
    }
    return result;
  }

  async updatePost(postId, change) {
    var result;
    try {
      result = await Post.findByIdAndUpdate(postId, { $set: { ...change } });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async deletePost(postId) {
    var result;
    try {
      result = await Post.findByIdAndDelete(postId);
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  //comment
  async getComment(postId, commentId) {
    var result, postFound;
    try {
      postFound = await Post.findById(postId)
      result = await postFound.comment.id(commentId);
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createComment(postId, commentItem) {
    var result, postFound;
    try {
      postFound = await Post.findById(postId)
      await postFound.comment.push(new Comment({ ...commentItem }));
      result = await postFound.save();
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async updateComment(postId, commentId, change) {
    var result;
    try {
      result = await Post.findAndUpdate(
        { _id: postId, "comments.id": commentId },
        { $set: { "comments.$": { ...change } } });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async deleteComment(userId, postId, commentId) {
    var result, postFound;
    try {
      postFound = await Post.findById(postId);
      await postFound.comments.pull({ _id: commentId, authorId: userId });
      result = await postFound.save();
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }
}

module.exports = PostDataHandler;