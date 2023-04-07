const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subscriptionUserController,
  registrationConfirmationController,
  resendConfirmationEmailController,
} = require('../controllers/userController.js');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  userValidation,
  subscriptionValidation,
  userConfirmationValidation,
} = require('../middlewares/validationMiddleware');

router.post('/register', userValidation, asyncWrapper(registerUserController));

router.get(
  '/verify/:verificationToken',
  asyncWrapper(registrationConfirmationController),
);

router.post(
  '/verify/',
  userConfirmationValidation,
  asyncWrapper(resendConfirmationEmailController),
);

router.post('/login', userValidation, asyncWrapper(loginUserController));

router.post('/logout', authMiddleware, asyncWrapper(logoutUserController));

router.post('/current', authMiddleware, asyncWrapper(currentUserController));

router.patch(
  '/',
  subscriptionValidation,
  authMiddleware,
  asyncWrapper(subscriptionUserController),
);

module.exports = router;
