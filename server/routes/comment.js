const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/')
  .get(passportJWT, (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(commentController.getComment(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post(passportJWT, (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(commentController.createComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/update')
  .put(passportJWT, (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(commentController.updateComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .delete(passportJWT, (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(commentController.deleteComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;