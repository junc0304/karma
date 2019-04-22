const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passport_config = require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });
const BoardController = require('../controllers/boards');
const CommentController = require('../controllers/comments');

router.route('/:btype')
    .get(passportJWT, BoardController.view_all_posts)  // get all postings
    .post(passportJWT, BoardController.create_post) // create new posting

router.route('/:btype/search')
    .get(passportJWT, BoardController.find_posts)   // search posting

router.route('/:btype/:bid')
    .get(passportJWT, BoardController.find_posts)   // get specific posting
    .put(passportJWT, BoardController.update_post)   // edit specific posting
    .delete(passportJWT, BoardController.delete_post)// delete sepecific posting

router.route('/:btype/:bid/comment')
    .post(passportJWT, CommentController.create_comment)

router.route('/:btype/:bid/comment/:cid')
    .get(passportJWT, CommentController.view_all_comments)
    .put(passportJWT, CommentController.update_comment)
    .delete(passportJWT, CommentController.delete_comment)

module.exports = router;