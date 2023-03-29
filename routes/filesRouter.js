const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { asyncWrapper } = require('../helpers/apiHelpers');
const authMiddleware = require('../middlewares/authMiddleware');

const { uploadController } = require('../controllers/filesController');

const AVATAR_DIR = path.resolve('./public/avatars');
const FILE_DIR = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  // filename: (req, file, cb) => {
  //   const [, extension] = file.originalname.split('.');
  //   cb(null, `${uuidv4()}.${extension}`);
  // },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({ storage: storage });

router.use('/avatars', express.static(AVATAR_DIR));
router.patch(
  '/user/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(uploadController),
);

module.exports = router;
