const service = require('../services/userService');

const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await service.registerUser({ email, password });

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const registrationConfirmationController = async (req, res) => {
  const code = req.params.verificationToken;
  await service.registrationConfirmation(code);
  return res.status(200).json({ message: 'Verification successful' });
};

const resendConfirmationEmailController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'missing required field email' });
  }
  await service.resendConfirmationEmail(email);
  res.status(200).json({ message: 'Verification email sent' });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const { token, subscription } = await service.loginUser({ email, password });
  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logoutUserController = async (req, res) => {
  const { _id: id } = req.user;
  const user = await service.logoutUser(id);
  if (!user.token) {
    res.status(204).end();
  }
  res.status(401).json({ message: 'Not authorized' });
};

const currentUserController = async (req, res) => {
  const { _id: id } = req.user;
  const { email, subscription } = await service.currentUser(id);
  res.status(200).json({ user: { email, subscription } });
};

const subscriptionUserController = async (req, res) => {
  const body = req.body;
  const { _id: id } = req.user;
  const { email, subscription } = await service.subscriptionUser(body, id);
  return res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subscriptionUserController,
  registrationConfirmationController,
  resendConfirmationEmailController,
};
