const express= require('express');
const post= require('../controller/postdbcontroller')
const router = express.Router();
const uploadMiddleware = require('../middlewares/multer');

router.post('/:id',uploadMiddleware,post.createpost)
router.patch('/update/:postid',uploadMiddleware, post.updatepost)
router.delete('/delete/:postid', uploadMiddleware, post.deletepost)
router.post('/getall/:authorid',uploadMiddleware, post.getallposts)
// router.patch('/update/:id',require('../middlewares/multer'))

// router.patch('/:username/:postUrl',post.udt)



module.exports = router;