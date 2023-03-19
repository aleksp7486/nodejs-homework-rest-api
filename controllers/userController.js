const service = require('../services/userService');

const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await service.registerUser({ email, password });

  return res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
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
  res.status(200).json({ email, subscription });
};

const userSubscriptionController = async (req, res) => {
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
  userSubscriptionController,
};
