const User = require('../db/userModel');

const updateAvatar = (id, path) => {
  return User.findByIdAndUpdate({ _id: id }, { avatarURL: path });
};

module.exports = {
  updateAvatar,
};
