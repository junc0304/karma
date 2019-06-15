const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passport_config = require('../passport');
const HttpResponseException = require('../classes/HttpResponseException/httpResponseException');

router.route('/:type')
  .get(async (req, res, next) => {
    try {
      console.log(req.params, req.body )
      const pageController = req.container.resolve('pageController');
      const result = await pageController.getpagesByType(req.params.type);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/:type/create')
  .post(passportJWT, async (req, res, next) => {
    try {
      const pageController = req.container.resolve('pageController');
      console.log(req.user, req.body)

      const result = await pageController.createpage(req.user, req.body);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
});

router.route('/:type/update')
  .put(passportJWT, async (req, res, next) => {
    try {
      const pageController = req.container.resolve('pageController');
      const result = await pageController.updatepage(req.user, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
  });

router.route('/:type/delete')
  .delete(passportJWT, async (req, res, next) => {
    try {
      const pageController = req.container.resolve('pageController');
      const result = await pageController.deletepage(req.user, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status).json(err);
    }
});

module.exports = router;