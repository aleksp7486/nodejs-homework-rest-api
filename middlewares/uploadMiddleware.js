const path = require('path');
const multer = require('multer');

const FILE_DIR = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;