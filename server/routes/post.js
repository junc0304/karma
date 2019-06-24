const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post( async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log(req.body);
      res.status(200).json(await postController.getPostsByType(req.body));
    } catch (err) {
      console.log(err)
      res.status(err.status).json(err);
    }
  });

router.route('/get')
  .post( validateBody(schemas.getPost.id), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      res.status(200).json(await postController.getPost(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });
// validateBody(schemas.createPost), passportJWT,
router.route('/create')
  .post( async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      res.status(200).json(await postController.createPost(/* req.user, */ req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/update')
  .post(validateBody(schemas.updatePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      res.status(200).json(await postController.updatePost(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .post(validateBody(schemas.deletePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      res.status(200).json(await postController.deletePost(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;