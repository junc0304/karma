const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Board = require('../models/board');
const { BOARD_TYPE } = require('../configuration')

module.exports = {
    create_post: async (req, res, next) => {
        console.log('create_post called');
        const { btype } = req.params;
        const { title, contents, password } = req.body;

        console.log('req', req.body);
        console.log('param', req.params);
        if (!title) {
            return res.status(403).json({error: 'missing title'});
        }

        if (!password) {
            return res.status(403).json({error: 'missing password'});
        }

        const boardTypeValid = BOARD_TYPE.includes(btype);

        console.log('boardTYpeValid', boardTypeValid)
        if (!boardTypeValid) {
            return res.status(403).json({error:  `invalid board`});
        }

        //const findIndex = await Board.findOne({ board_type: btype }, 'board.index').sort('-board.index');
        //const newIndex = findIndex === undefined || findIndex === null ? 1 : findIndex.board.index + 1;
        const newIndex = await Board
            .findOne({ board_type: btype }, 'index')
            .sort('-index')
            .then((result) => {
                if (result) {
                    console.log('board index', result.index);
                    return result.index + 1;
                }
                return 1;
            });
        const newPost = new Board({
            board_type: btype,
            index: newIndex,
            title: title,
            contents: contents,
            author_name: req.user.account_info.name,
            author_id: req.user.id,
            password: password,
            
        });
        console.log(req.user);
        console.log(newPost);
        await newPost.save();

        res.status(200).json(newPost);
    },

    delete_post: async (req, res, next) => {
        console.log('delete_post called');

        const { password } = req.value.body;
        const { btype, bid } = req.params;

        const boardTypeValid = BOARD_TYPE.includes(btype);
        if (!boardTypeValid) {
            returnres.status(403).json({error: `invalid board`});
        }
        // password missing
        if (!password) {
            return res.status(403).json({error: 'missing password'});
        }

        const board = await Board
            .findOne({
                board_type: btype,
                index: bid 
            })
            .select('+password');

        // invalid password
        if (!await board.isValidPassword(password)) {
            return res.status(403).json({error: 'wrong password' });
        }
        // posting not found
        if (!board) {
            return res.status(403).json({error: 'invalid post'});
        }

        //delete post and comments
        await Board.findByIdAndDelete(board.id, async (res, err) => {
            if (err, doc) { 
                return handleError(err);
            }

            await Comment.deleteMany({ board_id: doc.id });
            
            res.status(200).json( doc );
        });
    },

    update_post: async (req, res, next) => {
        console.log('update_post called');

        const { title, board_type, contents, password } = req.value.body;
        const { btype, bid } = req.params;

        const boardTypeValid = BOARD_TYPE.includes(btype);
        if (!boardTypeValid) {
            return res.status(403).json({error:  `invalid board`});
        }
        if (!password) {
            return res.status(403).json({error: 'missing password' });
        }

        const board = await Board
            .findOne({
                board_type: btype,
                index: bid 
            })
            .select('+password');

        // invalid password
        if (!await board.isValidPassword(password)) {
            return res.status(403).json({error:  'wrong password'});
        }

        await Board
            .findByIdAndUpdate( board.id , {
                $set: {
                        title: title,
                        board_type: board_type,
                        contents: contents,
                        password: password,
                    }
            }, async (err, doc) => {
                if(err) {
                    return handleError(err);
                }

                res.status(200).json({ doc });
            }
        );

    },

    view_all_posts: async (req, res, next) => {
        console.log('get_all_post called');
        const { btype } = req.params;

        const boardTypeValid = BOARD_TYPE.includes(btype);
        if (!boardTypeValid) {
            return res.status(403).json({error:  `invalid board`});
        }

        const allPost = await Board
            .find({ board_type: btype })
            .sort({ index: -1 });
            
            res.status(200).json(allPost);
    },

    find_posts: async (req, res, next) => {
        console.log('find_posts called');

        const { btype } = req.params;
        const { search, created_before, created_after, updated_before, updated_after } = req.value.body;
        const updated_query = {};
        const created_query = {};

        if(updated_after) updated_query.$gt = updated_after;
        if(updated_before) updated_query.$lt = updated_before;
        
        if(created_after) created_query.$gt = created_after;
        if(created_before) created_query.$lt = created_before;

        const results = await Board
            .find({
                $text: {
                    $search: search 
                },
                board_type: btype,
                created: created_query,
                updated: updated_query,
            });

        if (!results) {
            res.status(403).json({ error: 'no results'});
        }

        res.status(200).json(results);
    },
}
