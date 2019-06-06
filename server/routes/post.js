const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/')
  .get(passportJWT, (req, res, next) => {
    var postController = req.container.resolve('postController');
    try {
      res.send(postController.getPost(req.body.post));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/create')
  .post(passportJWT, (req, res, next) => {
    var postController = req.container.resolve('postController');
    try {
      res.send(postController.createPost(req.body.post));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/update')
  .put(passportJWT, (req, res, next) => {
    var postController = req.container.resolve('postController');
    try {
      res.send(postController.updatePost(req.user, req.body.post));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/delete')
  .delete(passportJWT, (req, res, next) => {
    var postController = req.container.resolve('postController');
    try {
      res.send(postController.deletePost(req.user, req.body.post));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

module.exports = router;