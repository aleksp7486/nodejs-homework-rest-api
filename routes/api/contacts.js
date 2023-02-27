const express = require('express');
const {
  listContacts,
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

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  if (!contacts) {
    res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json(contact);
});

router.post('/', addContactValidation, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const contactExist = await removeContact(req.params.contactId);
  if (contactExist) {
    res.status(200).json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', updateContactValidation, async (req, res, next) => {
  if (!req.body) {
    res.status(400).res.json({ message: 'missing fields' });
  }
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updateContact) {
    res.status(404).res.json({ message: 'Not found' });
  }
  res.status(200).json(updatedContact);
});

module.exports = router;
