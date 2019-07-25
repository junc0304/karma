const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post( passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log(req.body)
      let post = await postController.getPostsByType(req.body);
      res.status(200).json(post);
    } catch (err) {
      console.log(err)
      res.status(err.status).json(err);
    }
  });

router.route('/get')
  .post( validateBody(schemas.getPost.id), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log(req.body)
      let post = await postController.getPost(req.body)
      res.status(200).json(post);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });


router.route('/getNew')
  .post( passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      let post = await postController.getNewPosts(req.body)
      res.status(200).json(post);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post( validateBody(schemas.createPost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      await postController.createPost(req.user, req.body);
      res.status(200).send({success: true});
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/update')
  .post( validateBody(schemas.updatePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      await postController.updatePost(req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .post( validateBody(schemas.deletePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      res.status(200).json(await postController.deletePost(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;