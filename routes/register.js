const express = require('express');
const register = require('../controller/registercontroller');
const router = express.Router();
router.post('/', register.regeiser);

module.exports = router;