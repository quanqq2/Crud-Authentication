// Import các module cần thiết
const passport = require('passport');
require('../middlewares/googlepp')

// Xử lý khi người dùng chọn Đăng nhập bằng Google
exports.loginWithGoogle = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Phạm vi thông tin cần truy cập từ Google
    callbackURL: '/auth/google/callback' // Đường dẫn callback sau khi đăng nhập thành công
  })(req, res, next);
};

// Xử lý khi Google gửi thông tin người dùng đã đăng nhập thành công
exports.loginWithGoogleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      // Xử lý lỗi
      return next(err);
    }
    if (!user) {
      // Người dùng không được cấp phép hoặc từ chối truy cập
      return res.redirect('/auth');
    }
    // Đăng nhập thành công, lưu thông tin người dùng vào session
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      //return res.redirect('/');
      res.end("Welcome");
    });
  })(req, res, next);
};

// Xử lý khi người dùng đăng xuất
exports.logout = (req, res) => {
  req.logout(); // Xóa thông tin người dùng khỏi session
  res.redirect('/'); // Chuyển hướng về trang chủ
};
