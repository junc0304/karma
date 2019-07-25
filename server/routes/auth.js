const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });

const passport_config = require('../passport');
const { COOKIE_TOKEN } = require('../configuration');

const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/signup')
  .post(validateBody(schemas.signUp), async (req, res, next) => {
    const authController = req.container.resolve('authController');
    try {
      console.log("user signup request")
      let {user, token}= await authController.signUp(req.body);
      res.cookie(COOKIE_TOKEN, token, { httpOnly: true })
      res.status(200).json(user);
    }
    catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/signin')
  .post(validateBody(schemas.signIn), passportLocal, async (req, res, next) => {
    const authController = req.container.resolve('authController');
    try {
      console.log("user login request")
      let { user, token } = await authController.signIn(req.body, req.user);
      res.cookie(COOKIE_TOKEN, token, { httpOnly: true });
      res.status(200).json(user);
    }
    catch (err) {
      console.log(err)
      res.status(err.status).json({Error: "Sign In failed"});
    }
  });

router.route('/signout')
  .post(passportJWT, async (req, res, next) => {
    try {
      console.log("sign out request")
      res.clearCookie(COOKIE_TOKEN);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(err.status).json(err);
    }    
  });

module.exports = router;