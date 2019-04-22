const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passport_config = require('../passport');

const { validateBody, schemas  } = require('../helpers/route_helpers')
const passportJWT = passport.authenticate('jwt', {session: false});
const passportLocal = passport.authenticate('local', {session: false});

const UsersController = require('../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.signUpSchema), UsersController.signup);

router.route('/signin')
    .post(validateBody(schemas.signInSchema), passportLocal, UsersController.signin);

router.route('/:uid')
    .get( passportJWT, UsersController.get_user)
    .put( passportJWT, UsersController.update_user )
    .delete( passportJWT, UsersController.delete_user );

module.exports = router;