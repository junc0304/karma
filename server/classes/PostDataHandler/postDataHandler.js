const Post = require('../../models/post');
const Comment = require('../../models/comment');

class PostDataHandler {
  constructor() {
  }

  //post
  getPosts(condition) {
    var result;
    try {
      result = await Post.find({...condition});
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  getPost(postId) {
    var result;
    try {
      result = await Post.findOne({ _id: postId });
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }

  createPost(postItem) {
    var result, newPost;
    try {
      newPost = new Post({ ...postItem });
      await newPost.save();
      result = newPost;
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updatePost(userId, postId, change) {
    var result;
    try {
      result = await Post.findOneAndUpdate(
        { authorId: userId, postId },
        { $set: { ...change } });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deletePost(userId, postId) {
    var result;
    try {
      result = await Post.findOneAndDelete({ authorId: userId, _id: postId });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  //comment
  getComment(postId, commentId) {
    var result, postFound;
    try {
      postFound = await Post.findById(postId)
      result = await postFound.comment.id(commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createComment(postId, commentItem) {
    var result, postFound;
    try {
      postFound = await Post.findById(postId)
      postFound.comment.push(new Comment({ ...commentItem }));
      result = await postFound.save();
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updateComment(userId, postId, commentId, change) {
    var result;
    try {
      result = await Post.findOneAndUpdate(
        { _id: postId, "comments.id": commentId, "comment.authorId": userId },
        { $set: { "comments.$": { ...change } } });
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteComment(userId, postId, commentId) {
    var result, postFound;
    try {
      postFound = await Post.findOne({ _id: postId });
      postFound.comments.pull({ _id: commentId, authorId: userId });
      result = await postFound.save();
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = PostDataHandler;