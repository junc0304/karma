const router = require('express-promise-router')();
const passport = require('passport');
const passportLocal = passport.authenticate('local', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/signup')
  .post(validateBody(schemas.signin), (req, res, next) => {
    var authController = req.container.resolve('authController');
    try {
      res.send(authController.signup(req.body.auth));
    } catch (err) {
      return new HttpResponseException(400, err);
    }
  });

router.route('/signin')
  .post(validateBody(schemas.signup), passportLocal, (req, res, next) => {
    var authController = req.container.resolve('authController');
    try {
      res.send(authController.signin(req.body.auth));
    } catch (err) {
      return new HttpResponseException(400, err);
    }
  });

module.exports = router;