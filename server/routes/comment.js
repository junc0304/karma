const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post( validateBody(schemas.getComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(await commentController.getComments(req.body));
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });

router.route('/create')
  .post( validateBody(schemas.createComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(await commentController.createComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });

router.route('/update')
  .post( validateBody(schemas.updateComment), passportJWT, async (req, res, next) => {
    const commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(await commentController.updateComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });

router.route('/delete')
  .post( validateBody(schemas.deleteComment), passportJWT, async (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.status(200).json(await commentController.deleteComment(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });

module.exports = router;