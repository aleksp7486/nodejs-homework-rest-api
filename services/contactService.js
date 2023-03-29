const Contact = require('../db/contactModel');
const { ObjectId } = require('mongodb');
const { IdError } = require('../helpers/error');

// todo: Сделать обертку, вместо повторяющегося кода

const getAllContacts = async (owner, { page, limit, favorite }) => {
  const skip = limit * (page - 1);
  if (favorite) {
    return Contact.find({ owner, favorite }).skip(skip).limit(limit);
  } else {
    return Contact.find({ owner }).skip(skip).limit(limit);
  }
};

const getContactById = async (id, owner) => {
  if (ObjectId.isValid(id)) {
    return Contact.findOne({
      _id: new ObjectId(id),
      owner,
    });
  } else {
    throw new IdError('Wrong id');
  }
};

const createContact = ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, fields, owner) => {
  if (ObjectId.isValid(id)) {
    return Contact.findByIdAndUpdate({ _id: new ObjectId(id), owner }, fields, {
      new: true,
    });
  } else {
    throw new IdError('Wrong id');
  }
};

const removeContact = (id, owner) => {
  if (ObjectId.isValid(id)) {
    return Contact.findOneAndRemove({ _id: new ObjectId(id), owner });
  } else {
    throw new IdError('Wrong id');
  }
};

const updateStatusContact = (id, body, owner) => {
  if (ObjectId.isValid(id)) {
    return Contact.findOneAndUpdate({ _id: new ObjectId(id), owner }, body, {
      new: true,
    });
  } else {
    throw new IdError('Wrong id');
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
