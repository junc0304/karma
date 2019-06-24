const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/')
  .post( async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json( await userController.getUsers());
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/get')
  .post( validateBody(schemas.getUser.getOne), passportJWT, async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json( await userController.getUserById(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post(validateBody(schemas.createUser), passportJWT, async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json( await userController.createUser(req.body));
    } catch (err) {
      res.status(err.status).json(err);    
    }
  });

router.route('/update')
  .post(validateBody(schemas.updateUser), passportJWT, async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json(await userController.updateUser(req.body));
    } catch (err) {
      res.status(err.status).json(err);    
    }
  });

router.route('/delete')
  .post(validateBody(schemas.deleteUser), passportJWT, async (req, res, next) => {
    var userController = req.container.resolve('userController');
    try {
      res.status(200).json(await userController.deleteUser(req.body));
    } catch (err) {
      res.status(err.status).json(err);    
    }
  });

module.exports = router;