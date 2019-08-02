const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/get')
  .post(validateBody(schemas.getPage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log("get a page");
      let page = await pageController.getPageByType(req.body);
      res.status(200).json(page);
    } catch (err) {
      res.status(400).json({ error: "could not get the page" });
    }
  });

router.route('/create')
  .post(validateBody(schemas.createPage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log("create a page");
      await pageController.createPage(req.user, req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({error: "could not create the page"});
    }
  });

router.route('/update')
  .post(validateBody(schemas.updatePage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log("update a page");
      await pageController.updatePage(req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: "could not update the page" });
    }
  });

router.route('/delete')
  .post(validateBody(schemas.deletePage), passportJWT, async (req, res, next) => {
    const pageController = req.container.resolve('pageController');
    try {
      console.log("delete a page");
      await pageController.deletePage(req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ error: "could not delete the page" });
    }
  });

module.exports = router;