const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');
const { validateBody, schemas } = require('../helpers/validateInput');
//validateBody(schemas.getPage), passportJWT, 
router.route('/get')
  .post(async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log("router",req.body)
      res.status(200).json(await pageController.getPageByType(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });
//validateBody(schemas.createPage), passportJWT,
router.route('/create')
  .post(
    async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      res.status(200).json(await pageController.createPage(req.user, req.body));
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });
//validateBody(schemas.updatePage), passportJWT,
router.route('/update')
  .post( async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log(req.body);
      res.status(200).json(await pageController.updatePage(req.body));
    } catch (err) {
      console.log(err)
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .post(validateBody(schemas.deletePage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      res.status(200).json(await pageController.deletePage(req.body));
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;