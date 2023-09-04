const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require('../model/user')
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user); // Lưu thông tin người dùng vào session
});

passport.deserializeUser((user, done) => {
  done(null, user); // Lấy thông tin người dùng từ session
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback' // Đường dẫn callback sau khi đăng nhập thành công
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken:',accessToken)
    console.log('refreshToken:',refreshToken)
    console.log('profile',profile)

    let existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      return done(null, existingUser);
    }
    
    const newUser = new User({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value
    });
    
    await newUser.save();
    
    return done(null, newUser);

  } catch (err) {
    return done(err);
  }
}));

  
