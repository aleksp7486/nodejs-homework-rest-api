const User = require('../db/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { RegistrationError, NotAuthorizedError } = require('../helpers/error');

const registerUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new RegistrationError('Email in use');
  }

  return User.create({ email, password });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong password');
  }

  const subscription = user.subscription;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  await User.findByIdAndUpdate(user._id, { token });

  return { token, subscription };
};

const logoutUser = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token: null },
    { new: true },
  );
  return updatedUser;
};

const currentUser = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }
  return user;
};

const subscriptionUser = async ({ subscription }, id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAuthorizedError('Not authorized');
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true },
  );
  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  subscriptionUser,
};
