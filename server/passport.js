const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { JWT_SECRET, COOKIE_TOKEN } = require('./configuration/index');
const User = require('./models/user');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[COOKIE_TOKEN];
  }
  return token;
}

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    req.user = user;
    done(null, user);
  }
  catch (error) {
    done(error, false);
  }
}));

passport.use('local', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return done(null, false);
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return done(null, false);
    }
    user.hidePassword();
    done(null, user);
  }
  catch (error) {
    done(error, false);
  }
}));