const router = require('express-promise-router')();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { validateBody, schemas } = require('../helpers/validateInput');

router.route('/all')
  .get(passportJWT, async (req, res, next) => {
    const historyController = req.container.resolve('historyController');
    try {
      console.log("get histories");
      let history = await historyController.getHistory(req.body);
      res.status(200).json(history);
    } catch (err) {
      res.status(400).json({ error: "could not get the history" });
    }
  });

router.route('/create')
  .post( validateBody(schemas.createHistory),passportJWT, async (req, res, next) => {
    const historyController = req.container.resolve('historyController');
    try {
      console.log("create history");
      await historyController.createHistory(req.body);
      res.status(200).send({ success: true });
    } catch (err) {
      res.status(400).json({ error: "could not create the history" });
    }
  });

router.route('/update')
  .post( validateBody(schemas.updateHistory), passportJWT, async (req, res, next) => {
    const historyController = req.container.resolve('historyController');
    try {
      console.log("update a history");
      await historyController.updateHistory(req.body);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ error: "could not update the history" });
    }
  });

router.route('/delete')
  .post( validateBody(schemas.deleteHistory), passportJWT, async (req, res, next) => {
    const historyController = req.container.resolve('historyController');
    try {
      console.log("delete a history");
      await historyController.deleteHistory(req.body)
      res.status(200).json({success: true});
    } catch (err) {
      res.status(400).json({ error: "could not delete the history" });
    }
  });

module.exports = router;