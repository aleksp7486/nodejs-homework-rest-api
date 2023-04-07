const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const sha256 = require('sha256');
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../db/userModel');
const {
  RegistrationError,
  NotAuthorizedError,
  UserNotFound,
  VerificationPassed,
} = require('../helpers/error');

/*

const isDevelopment = process.env.NODE_ENV === 'development';

const verificationUrl = isDevelopment
  ? `${process.env.VERIFICATION_URL}${process.env.PORT || 3000}`
  : `https://www.test.com/test`;

*/

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new RegistrationError('Email in use');
  }

  const avatarURL = gravatar.url(email, {
    protocol: 'http',
    s: '200',
    r: 'pg',
    d: 'mp',
  });

  const verificationToken = sha256(email + process.env.JWT_SECRET);

  const user = new User({
    email,
    password,
    verificationToken,
    avatarURL,
  });
  await user.save();

  const emailOption = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Thank you for registration!',

    html: `<h2>Please, confirm your email address</h2>`,
    text: `Please, confirm your email address`,
    // html: `<h2>Please, confirm your email address</h2> <a href="${verificationUrl}/api/user/verify/${user.verificationToken}">Click here</a>`,
    // text: `Please, confirm your email address  ${verificationUrl}/api/user/verify/${user.verificationToken}`,
  };

  await transporter
    .sendMail(emailOption)
    .then(info => console.log(info))
    .catch(e => console.error(e));

  return user;
};

const registrationConfirmation = async code => {
  const verification = await User.findOne({ verificationToken: code });
  if (!verification) {
    throw new UserNotFound('User not found');
  }

  const user = await User.findByIdAndUpdate(verification._id, {
    verificationToken: null,
    verify: true,
  });

  const emailOption = {
    from: 'aleksp7486@meta.ua',
    to: user.email,
    subject: 'Thank you for registration!',
    html: '<h2>Thank you for registering, we are very glad that you are </h2>',
    text: 'Thank you for registering, we are very glad that you are with us!',
  };

  await transporter
    .sendMail(emailOption)
    .then(info => console.log(info))
    .catch(e => console.error(e));
};

const resendConfirmationEmail = async email => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new UserNotFound('User not found');
  }
  if (user.verify) {
    throw new VerificationPassed('Verification has already been passed');
  }

  const emailOption = {
    from: 'aleksp7486@meta.ua',
    to: user.email,
    subject: 'Thank you for registration!',
    html: `<h2>Please, confirm your email address</h2>`,
    text: `Please, confirm your email address`,
    // html: `<h2>Please, confirm your email address</h2> <a href="${verificationUrl}/api/user/verify/${user.verificationToken}">Click here</a>`,
    // text: `Please, confirm your email address  ${verificationUrl}/api/user/verify/${user.verificationToken}`,
  };

  await transporter
    .sendMail(emailOption)
    .then(info => console.log(info))
    .catch(e => console.error(e));
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong password');
  }
  if (!user.verify) {
    throw new NotAuthorizedError('Please confirm email');
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
  registrationConfirmation,
  resendConfirmationEmail,
};
