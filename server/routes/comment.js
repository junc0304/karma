const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post( validateBody(schemas.getComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      console.log("get comments");
      let comments = await commentController.getComments(req.body)
      res.status(200).json( comments );
    } catch (err) {
      res.status(400).json({error: "get comments failed"});
    }
  });

router.route('/create')
  .post(validateBody(schemas.createComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      console.log("create a comments");
      await commentController.createComment(req.user, req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(400).json({error: "create comment failed"});
    }
  });

router.route('/update')
  .post( validateBody(schemas.updateComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      console.log("update a comment");
      await commentController.updateComment(req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(400).json({error: "update comment failed"});
    }
  });

router.route('/delete')
  .post( validateBody(schemas.deleteComment), passportJWT, async (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      console.log("delete a comment");
      await commentController.deleteComment(req.user, req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(400).json({ error: "delete comment failed"});
    }
  });

module.exports = router;