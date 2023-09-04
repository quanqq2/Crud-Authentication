const passport = require('passport')
require('../middlewares/facebookpp')

  exports.loginWithFacebookCallback = (req, res, next) => {
    passport.authenticate('facebook', (err, user) => {
      if (err) {
        // Xử lý lỗi
        return next(err);
      }
      if (!user) {
        // Người dùng không được cấp phép hoặc từ chối truy cập
        return res.redirect('/auth1');
      }
      // Đăng nhập thành công, lưu thông tin người dùng vào session
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        //return res.redirect('/');
        res.end("login with facebook successfully");
      });
    })(req, res, next);
  };
  exports.logout = (req, res) => {
    req.logout(); // Xóa thông tin người dùng khỏi session
    res.redirect('/'); // Chuyển hướng về trang chủ
  };
  