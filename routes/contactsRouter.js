const express = require('express');
const router = express.Router();
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusController,
} = require('../controllers/contactsController');
const {
  addContactValidation,
  updateContactValidation,
} = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, asyncWrapper(getContactsController));

router.get(
  '/:contactId',
  authMiddleware,
  asyncWrapper(getContactByIdController),
);

router.post(
  '/',
  authMiddleware,
  addContactValidation,
  asyncWrapper(addContactController),
);

router.put(
  '/:contactId',
  authMiddleware,
  updateContactValidation,
  asyncWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  authMiddleware,
  asyncWrapper(removeContactController),
);

router.patch(
  '/:contactId/favorite',
  authMiddleware,
  asyncWrapper(updateStatusController),
);

module.exports = router;
