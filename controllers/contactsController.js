const service = require('../service/index');

const getContactsController = async (_, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    if (!contacts) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contacts);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const result = await service.getContactById(contactId);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({
        message: `Failure, no contacts with id '${contactId}' found!`,
      });
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const addContactController = async (req, res, next) => {
  const fields = req.body;
  try {
    const result = await service.createContact(fields);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const fields = req.body;

  try {
    const result = await service.updateContact(contactId, fields);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const removeContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const updateStatusController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  console.log('🚀 ~ file: index.js:102 ~ updateStatus ~ body:', body);
  if (Object.keys(body).length === 0) {
    res.json({
      status: 'error',
      code: 400,
      message: 'missing field favorite',
    });
  } else {
    try {
      const result = await service.updateStatusContact(contactId, body);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e.message);
      next(e);
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
