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
      let result = await authController.signUp(req.body);
      res.status(200).cookie(COOKIE_TOKEN, result.token, { httpOnly: true }).json(result);
    }
    catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/signin')
  .post(validateBody(schemas.signin), passportLocal, async (req, res, next) => {
    const authController = req.container.resolve('authController');
    try {
      let result = await authController.signIn(req.user);
      res.status(200).cookie(COOKIE_TOKEN, result.token, { httpOnly: true }).json(result);
    }
    catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/signout')
  .post(passportJWT, async (req, res, next) => {
    try {
      res.status(200).clearCookie(COOKIE_TOKEN).send();
    } catch (err) {
      res.status(err.status).json(err);
    }    
  });

module.exports = router;