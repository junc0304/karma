const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/')
  .get( async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json( await userController.getUsers(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post(passportJWT, async (req, res, next) => {
    var userController = await req.container.resolve('userController');
    try {
      res.status(200).json(await userController.createUser(req.body));
    } catch (err) {
      res.status(err.status).json(err);    }
  });

router.route('/update')
  .put(passportJWT, async (req, res, next) => {
    var userController = await req.container.resolve('userController');
    try {
      res.status(200).json(await userController.updateUser(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err);    }
  });

router.route('/delete')
  .put(passportJWT, async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json(await userController.updateUser(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err);    }
  });

module.exports = router;