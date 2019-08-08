const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post(passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("get posts");
      let post = await postController.getPostsByType(req.body);
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ error: "could not get the post" });
    }
  });

router.route('/get')
  .post( validateBody(schemas.getPost.id), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("get a post");
      let post = await postController.getPost(req.body)
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ error: "could not get the posts" });
    }
  });


router.route('/recent')
  .post( passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("get recent posts");
      let post = await postController.getNewPosts(req.body)
      console.log(post)
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ error: "could not get recent posts" });
    }
  });

router.route('/create')
  .post( validateBody(schemas.createPost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("create posts");
      await postController.createPost(req.user, req.body);
      res.status(200).send({ success: true });
    } catch (err) {
      res.status(400).json({ error: "could not create the post" });
    }
  });

router.route('/update')
  .post( validateBody(schemas.updatePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("update a post");
      await postController.updatePost(req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ error: "could not update the post" });
    }
  });

router.route('/delete')
  .post( validateBody(schemas.deletePost), passportJWT, async (req, res, next) => {
    const postController = req.container.resolve('postController');
    try {
      console.log("delete a post");
      res.status(200).json(await postController.deletePost(req.body));
    } catch (err) {
      res.status(400).json({ error: "could not delete the post" });
    }
  });

module.exports = router;