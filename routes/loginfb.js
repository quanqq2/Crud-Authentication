// Import các module cần thiết
const express = require('express');
const router = express.Router();
const facebookcontroller = require('../controller/loginfacebook');
require('../middlewares/facebookpp')
// Đăng nhập bằng Google


// Xử lý callback từ Google sau khi đăng nhập thành công
router.get('/facebook/callback', facebookcontroller.loginWithFacebookCallback);

// Đăng xuất
router.get('/logout', facebookcontroller.logout);

// Export router
module.exports = router;