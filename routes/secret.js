const express = require('express');
const secret = require('../controller/secretcontroller');
const router = express.Router();
const passport =require('passport')
require('../middlewares/passport');

router.get('/', passport.authenticate('jwt', { session: false }), secret.secret);


module.exports = router;