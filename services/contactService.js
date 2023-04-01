const Contact = require('../db/contactModel');
const { ObjectId } = require('mongodb');
const { IdError } = require('../helpers/error');

const handleError = id => {
  if (!ObjectId.isValid(id)) {
    throw new IdError('Wrong id');
  }
};

const getAllContacts = async (owner, { page, limit, favorite }) => {
  const skip = limit * (page - 1);
  if (favorite) {
    return Contact.find({ owner, favorite }).skip(skip).limit(limit);
  } else {
    return Contact.find({ owner }).skip(skip).limit(limit);
  }
};

const getContactById = async (id, owner) => {
  handleError(id);
  return Contact.findOne({
    _id: new ObjectId(id),
    owner,
  });
};

const createContact = ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, fields, owner) => {
  handleError(id);
  return Contact.findByIdAndUpdate({ _id: new ObjectId(id), owner }, fields, {
    new: true,
  });
};

const removeContact = (id, owner) => {
  handleError(id);
  return Contact.findOneAndRemove({ _id: new ObjectId(id), owner });
};

const updateStatusContact = (id, body, owner) => {
  handleError(id);
  return Contact.findOneAndUpdate({ _id: new ObjectId(id), owner }, body, {
    new: true,
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
