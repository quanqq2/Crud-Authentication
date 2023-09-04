const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix);
  }
});

module.exports = multer({ storage: storage }).single('image');
