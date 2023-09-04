const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/user');
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config();

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey : process.env.SECRET_KEY,
};

passport.use(new JwtStrategy(jwtOptions, async (payload,done) => {
    try {
        console.log(payload);
        //const user = await User.findById(payload.username)
        //if (!user) return done(null,false);
        //done(null,user)
    }catch (err) {done(err, false);}
 } ));

passport.use(new LocalStrategy({
    usernameField: 'username'
 }, async (email, password, done) => {
    try{
        const user = await User.findOne({email})
        if (!user) return done(null, false)
        const isCorrectPassword = await user.isValidPassword(password)
        if(!isCorrectPassword) return done(null,false)
        done(null,false)
    } catch(error){
        done(null,false)
    }
}))