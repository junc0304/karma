const router = require('express-promise-router')();

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });

const passport_config = require('../passport');
const { COOKIE_TOKEN } = require('../configuration');

const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/signup')
  .post(validateBody(schemas.signin), (req, res, next) => {
    var authController = req.container.resolve('authController');
    try {
      res.cookie(COOKIE_TOKEN, authController.signUp(req.body.auth), { httpOnly: true }).send();
    } catch (err) {
      return new HttpResponseException(400, err);
    }
  });

router.route('/signin')
  .post(validateBody(schemas.signup), passportLocal, (req, res, next) => {
    var authController = req.container.resolve('authController');
    try {
      res.cookie(COOKIE_TOKEN, authController.signIn(req.user), { httpOnly: true }).send();
    } catch (err) {
      return new HttpResponseException(400, err);
    }
  });

router.route('/signout')
  .post(passportJWT, (req, res, next) => {
    try {
      res.clearCookie(COOKIE_TOKEN).send();
    } catch (err) {
      return new HttpResponseException(400, err);
    }
  });

module.exports = router;