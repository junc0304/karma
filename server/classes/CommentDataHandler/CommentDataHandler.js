const Comment = require('../../models/comment');

class CommentDataHandler {
  constructor() {
  }

  async getComments(postId) {
    var result;
    try {
      result = await Comment.find({ postId });
    }
    catch (err) {
      throw new Error(err);
    }
    return result;
  }

  async createComment(commentItem) {
    try {
      let comment = await new Comment({ ...commentItem });
      await comment.save();
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updateComment(commentId, updates) {
    try {
      await Comment.updateOne({ commentId }, { $set: { ...updates } });
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
}

module.exports = CommentDataHandler;