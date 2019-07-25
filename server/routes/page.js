const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/get')
  .post(validateBody(schemas.getPage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      let page = await pageController.getPageByType(req.body);
      res.status(200).json(page);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/create')
  .post(validateBody(schemas.createPage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      await pageController.createPage(req.user, req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(err.status).json(err.message);
    }
  });

router.route('/update')
  .post(validateBody(schemas.updatePage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      await pageController.updatePage(req.body);
      res.status(200).json({success: true});
    } catch (err) {
      console.log(err)
      res.status(err.status).json(err);
    }
  });

router.route('/delete')
  .post(validateBody(schemas.deletePage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      await pageController.deletePage(req.body);
      res.status(200).json({success: true});
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

module.exports = router;