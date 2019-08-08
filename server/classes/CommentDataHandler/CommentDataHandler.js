const Comment = require('../../models/comment');

class CommentDataHandler {
  constructor() {
  }

  async deleteComments(postId) {
    try{
      await Comment.deleteMany({postId});
    }
    catch(err) {
      throw new Error(err);
    }
  }
  
  async getComments(postId) {
    var result;
    try {
      result = await Comment.find({ postId: postId }).sort({created:-1});
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createComment(commentItem) {
    var result;
    try {
      let newComment = new Comment({ ...commentItem });
      await newComment.save();
      result = newComment._id;
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async updateComment(commentId, updates) {
    try {
      await Comment.updateOne({ commentId }, { $set: { ...updates } });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updateCommentUserName(userId, name) {
    try {
      await Comment.updateMany({ authorId: userId }, { $set: { authorName: name} });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async deleteComment(commentId) {
    try {
      await Comment.deleteOne({ commentId });
    }
    catch (err) {
      throw new Error(err);
    }
  }

  
  async searchComment(fields) {   
    let result;
    try {
     result = await Comment.findOne({ ...fields });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }
}

module.exports = CommentDataHandler;