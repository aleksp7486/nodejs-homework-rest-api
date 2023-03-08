const express = require('express');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusController,
} = require('../../controllers/contactsController');

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', addContactValidation, addContactController);

router.put('/:contactId', updateContactValidation, updateContactController);

router.delete('/:contactId', removeContactController);

router.patch('/:contactId/favorite', updateStatusController);

module.exports = router;
