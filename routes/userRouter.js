const express = require('express');

const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  userSubscriptionController,
} = require('../controllers/userController.js');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  userValidation,
  subscriptionValidation,
} = require('../middlewares/validationMiddleware');

router.post('/register', userValidation, asyncWrapper(registerUserController));

router.post('/login', userValidation, asyncWrapper(loginUserController));

router.post('/logout', authMiddleware, asyncWrapper(logoutUserController));

router.post('/current', authMiddleware, asyncWrapper(currentUserController));

router.patch(
  '/',
  subscriptionValidation,
  authMiddleware,
  asyncWrapper(userSubscriptionController),
);

module.exports = router;
