const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/')
  .get(passportJWT, (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.send(commentController.getcomment(req.body.comment));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/create')
  .post(passportJWT, (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.send(commentController.createcomment(req.body.comment));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/update')
  .put(passportJWT, (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.send(commentController.updatecomment(req.user, req.body.comment));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/delete')
  .delete(passportJWT, (req, res, next) => {
    var commentController = req.container.resolve('commentController');
    try {
      res.send(commentController.deletecomment(req.user, req.body.comment));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

module.exports = router;