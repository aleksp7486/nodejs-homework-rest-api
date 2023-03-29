const Jimp = require('jimp');
const path = require('path');
const service = require('../services/filesService');

const AVATAR_DIR = path.resolve('./public/avatars');

const uploadController = async (req, res) => {
  const { _id: id } = req.user;
  const { path } = req.file;
  const [, extension] = req.file.originalname.split('.');
  const avatarPath = `${AVATAR_DIR}/${id}.${extension}`;
  await Jimp.read(path)
    .then(image => {
      return image
        .resize(250, Jimp.AUTO) // resize
        .quality(80) // set JPEG quality
        .write(avatarPath); // save
    })
    .catch(err => {
      console.error(err);
    });

  const result = await service.updateAvatar(id, avatarPath);

  if (result) {
    res.status(200).json({
      data: { avatarURL: result.avatarURL },
    });
  } else {
    res.status(401).json({
      message: 'Not authorized',
    });
  }
};

module.exports = {
  uploadController,
};
