const service = require('../services/contactService');

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite = false } = req.query;
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  page = parseInt(page);

  const contacts = await service.getAllContacts(owner, {
    page,
    limit,
    favorite,
  });

  if (contacts) {
    return res.status(200).json({ data: { contacts }, page, limit });
  } else {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  console.log(req.user);
  const { _id: owner } = req.user;

  const result = await service.getContactById(contactId, owner);

  if (result) {
    return res.status(200).json({ data: { contact: result } });
  } else {
    return res.status(404).json({
      message: `Failure, no contacts with id '${contactId}' found!`,
    });
  }
};

const addContactController = async (req, res) => {
  const contact = req.body;
  const { _id: owner } = req.user;
  const result = await service.createContact(contact, owner);
  res.status(201).json({
    data: { contact: result },
  });
};

const updateContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const { _id: owner } = req.user;

  const result = await service.updateContact(contactId, body, owner);
  if (result) {
    res.status(200).json({
      data: { contact: result },
    });
  } else {
    res.status(404).json({
      message: `Not found contact id: ${contactId}`,
    });
  }
};

const removeContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: owner } = req.user;

  const result = await service.removeContact(contactId, owner);
  if (result) {
    res.status(200).json({
      data: { contact: result },
    });
  } else {
    res.status(404).json({
      message: `Not found contact id: ${contactId}`,
    });
  }
};

const updateStatusController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const { _id: owner } = req.user;

  if (Object.keys(body).length === 0) {
    res.status(400).json({
      message: 'missing field favorite',
    });
  } else {
    const result = await service.updateStatusContact(contactId, body, owner);
    if (result) {
      res.status(200).json({
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${contactId}`,
      });
    }
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusController,
};
