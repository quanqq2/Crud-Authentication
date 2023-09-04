const FacebookStrategy =require('passport-facebook').Strategy;
const User =require('../model/user')
const passport = require('passport');
require('dotenv').config();
passport.serializeUser((user, done) => {
    done(null, user); // Lưu thông tin người dùng vào session
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user); // Lấy thông tin người dùng từ session
  });

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth1/facebook/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
        console.log('accessToken:',accessToken)
        console.log('refreshToken:',refreshToken)
        console.log('profile',profile)
      let existingUser = await User.findOne({ FacebookId: profile.id });
      if (existingUser) {
        return cb(null, existingUser);
      }
      
      const newUser = new User({
        FacebookId: profile.id,
        username: profile.displayName,
        email: profile.email
      });
      
      await newUser.save();
      
      return cb(null, newUser);
  
    } catch (err) {
      return cb(err);
    }
  }
));
