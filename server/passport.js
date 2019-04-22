const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const Config = require('./configuration/index');
const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: Config.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) =>{
    try {
        const user = await User.findOne({'account_info.email':email}).select("+password");

        console.log(user);
        
        if(!user) {
            return done(null, false);
        }
        const isMatch = await user.isValidPassword(password);
        //check password
        if(!isMatch) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));