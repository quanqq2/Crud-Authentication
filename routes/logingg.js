// Import các module cần thiết
const express = require('express');
const router = express.Router();
const googleController = require('../controller/logincontroller');

require('../middlewares/googlepp')
// Đăng nhập bằng Google
router.get('/google', googleController.loginWithGoogle);

// Xử lý callback từ Google sau khi đăng nhập thành công
router.get('/google/callback', googleController.loginWithGoogleCallback);

// Đăng xuất
router.get('/logout', googleController.logout);


// Export router
module.exports = router;
