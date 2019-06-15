const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/:type')
  .get(async (req, res, next) => {
    try {
      console.log(req.params, req.body )
      const postController = req.container.resolve('postController');
      const result = await postController.getPostsByType(req.params.type);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/get')
  .get(passportJWT, async (req, res, next) => {
    try {
      console.log(req.body);
      const postController = req.container.resolve('postController');
      const result = await postController.getPost(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post(passportJWT, async (req, res, next) => {
    try {
      const postController = req.container.resolve('postController');
      console.log(req.user, req.body)

      const result = await postController.createPost(req.user, req.body);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/update')
  .put(passportJWT, async (req, res, next) => {
    try {
      const postController = req.container.resolve('postController');
      const result = await postController.updatePost(req.user, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .delete(passportJWT, async (req, res, next) => {
    try {
      const postController = req.container.resolve('postController');
      const result = await postController.deletePost(req.user, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;