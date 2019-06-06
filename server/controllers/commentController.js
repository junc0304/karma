const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');

class CommentController {
  constructor(postDataHandler) {
    this.postDataHandler = postDataHandler;
  }

  getComment({postId, commentId}) {
    var result;
    try {
      result = this.postDataHandler.getComment(postId, commentId);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  createComment({postId, comment}) {
    var result, postId;
    try {
      postId = commentItem.postId;
      delete commentItem.postId;
      result = this.postDataHandler.createComment(postId, comment);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  updateComment(userId, {commentId, postId, updates}) {
    var result;
    try {
      result = this.postDataHandler.updateComment(userId, postId, commentId, updates);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  deleteComment(userId, {commentId, postId} ) {
    var result;
    try {
      result = postDataHandler.deleteComment(userId, postId, commentId);
    } catch(err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = CommentController;

 /**
ValidateBoard = async req => {
    const { btype, bid } = req.params;
    const boardTypeValid = BOARD_TYPE.includes(btype);

    //board type check
    if (!boardTypeValid) {
        return {
            status: 'error',
            code: 403,
            messages: `invalid board`,
            data: {}
        };
    }

    //board index check
    const board = await Board.findOne({ board_type: btype, index: bid })
    if (!board) {
        return {
            status: 'error',
            code: 403,
            messages: `invalid post`,
            data: {}
        };
    }
    
    return {
        status: 'success',
        code: 200,
        message: 'Ok',
        data: { board }
    }
}

ValidateComment = async req => {
    const { btype, bid, cid } = req.params;
    const boardObjecId = await Board.findOne({board_type: btype, index: bid });
    const comment = await Comment.findOne({ board_id: boardObjecId, index: cid });

    if (!comment) {
        return {
            status: 'error',
            code: 403,
            messages: `invalid comment`,
            data: {}
        };
    }

    if (!comment.author === req.user) {
        return {
            status: 'error',
            code: 403,
            messages: `you do not have permission`,
            data: {}
        }
    }

    return {
        status: 'success',
        code: 200,
        message: 'Ok',
        data: comment
    }
}

module.exports = {

    create_comment: async (req, res, next) => {
        console.log('create_comment called');

        const { btype, bid } = req.params;
        const { contents } = req.value.body;

        const boardTypeValid = BOARD_TYPE.includes(btype);
        if (!boardTypeValid) {
            return res.status(403).json({ error: `invalid board`})
        }
        const board = await Board
            .findOne({ 
                board_type: btype, 
                index: bid 
            });

        if (!board) {
            return res.status(403).json({ error:  `invalid post`});
        }
        
        const newIndex = board.comment_count + 1;
        const newComment = new Comment({
            index: newIndex,
            contents: contents,
            author: req.user.name,
            board_id: board.id,
            user_id: req.user.id
        });

        await newComment
            .save( async (error) => {
                if (error) {
                    return res.status(403).json({ error: error.message });
                }
                await Board
                    .findByIdAndUpdate( board.id, 
                        {
                            $push: { 
                                comment: newComment.id
                            }, 
                            comment_count: board.comment_count + 1
                        }
                    );
                });
      
        res.status(200).json({});
    },

    delete_comment: async (req, res, next) => {
        console.log('delete_comment called')

        const { btype, bid, cid } = req.params;
        const boardTypeValid = BOARD_TYPE.includes(btype);

        //board type check
        if (!boardTypeValid) {
            return res.res.status(403).json({ error: `invalid board`});
        }

        //board index check
        const board = await Board.findOne({ 
            board_type: btype, 
            index: bid 
        });

        if (!board) {
            return res.status(403).json({ error: `invalid post`});
        }

        const comment = await Comment
            .findOne({ 
                board_id: board.id, 
                index: cid 
            });

        if (!comment) {
            return res.status(403).json({ error:  `invalid comment`});
        }
    
        if (!comment.user_id === req.user.id 
            && !USER_ROLES.ADMIN.includes(req.user.account_info.role)) {
            return res.status(403).json({ error: `permission denied`});
        }

        await Comment
            .updateOne({ 
                board_id: board.id, 
                index: cid, 
                user_id: req.user.id 
            }, {
                $set: {
                    status: "deleted"
                }
            });

        res.status(200).json({});
    },

    update_comment: async (req, res, next) => {
        console.log('update_comment called');

        const { btype, bid, cid } = req.params;
        const { contents, status } = req.value.body;
        const boardTypeValid = BOARD_TYPE.includes(btype);
        const updates = {};
        //board type check
        if (!boardTypeValid) {
            return res.status(403).json({ error: `invalid board`});
        }
        //status check
        if(!status &&!['hidden', 'normal'].includes(status)) {
            return res.status(403).json({ error: `invalid status`});           
        }

        if(status) {
            updates.status = status;
        }


        const board = await Board.findOne({ 
            board_type: btype, 
            index: bid 
        });

        //board index check
        if (!board) {
            return res.status(403).json({ error: `invalid post`});
        }

        const comment = await Comment
            .findOne({ 
                board_id: board.id, 
                index: cid 
            });

        if (!comment) {
            return res.status(403).json({ error: `invalid comment`});
        }
        updates.contents = contents;
    
        if (!comment.user_id === req.user.id 
            && !USER_ROLES.ADMIN.includes(req.user.account_info.role)) {
            return res.status(403).json({ error:  `permission denied`});
        }

        await Comment
            .updateOne({ 
                board_id: board.id, 
                index: cid, 
                user_id: req.user.id 
            }, {
                $set: updates
            });

        res.status(200).json({});
    },

    view_all_comments: async (req, res, next) => {
        console.log('view_all_comments called');

        const { btype, bid, cid } = req.params;
        const boardTypeValid = BOARD_TYPE.includes(btype);

        //board type check
        if (!boardTypeValid) {
            return  res.status(403).json({ error: `invalid board`});
        }

        //board index check
        const board = await Board
            .findOne({ 
                board_type: btype, 
                index: bid 
            });

        if (!board) {
            return  res.status(403).json({ error: `invalid post`});
        }
    
        const allComments = await Comment
            .find({ 
                board_id: board.id 
            });
          
        res.json({ comments_count: allComments.length,
                    commnets: allComments });
    }
}
 */