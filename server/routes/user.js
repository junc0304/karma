const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/')
  .get(passportJWT, (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.send(userController.getUser(req.body.user));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/create')
  .post(passportJWT, (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.send(userController.createUser(req.body.user));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/update')
  .put(passportJWT, (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.send(userController.updateUser(req.body.user));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

router.route('/delete')
  .put(passportJWT, (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.send(userController.deleteUser(req.user, req.body.user));
    } catch (err) {
      throw new HttpResponseException(400, err);
    }
  });

module.exports = router;