const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', addContactValidation, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContactValidation, updateContact);

module.exports = router;
