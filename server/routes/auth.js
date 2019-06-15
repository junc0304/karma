const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });

const passport_config = require('../passport');
const { COOKIE_TOKEN } = require('../configuration');

const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/signup')
  .post(validateBody(schemas.signup), async (req, res, next) => {
    const authController = req.container.resolve('authController');
    try {
      let result = await authController.signup(req.body);
      res.cookie(COOKIE_TOKEN, result.token, { httpOnly: true }).status(200).json(result);
    }
    catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/signin')
  .post(validateBody(schemas.signin), passportLocal, async (req, res, next) => {
    const authController = req.container.resolve('authController');
    try {
      let result = await authController.signin(req.user);
      res.cookie(COOKIE_TOKEN, result.token, { httpOnly: true }).status(200).json(result);
    }
    catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/signout')
  .post(passportJWT, async (req, res, next) => {
    try {
      res.clearCookie(COOKIE_TOKEN).status(200).send();
    } catch (err) {
      res.status(err.status).json(err);
    }    
  });

module.exports = router;