const User = require('../db/userModel');

const updateAvatar = (id, path) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { avatarURL: path },
    { new: true },
  );
};

module.exports = {
  updateAvatar,
};
