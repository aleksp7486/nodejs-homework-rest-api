const Contact = require('../db/contactModel');

const getAllContacts = async (owner, { page, limit, favorite }) => {
  const skip = limit * (page - 1);
  if (favorite) {
    return Contact.find({ owner, favorite }).skip(skip).limit(limit);
  } else {
    return Contact.find({ owner }).skip(skip).limit(limit);
  }
};

const getContactById = async (id, owner) => {
  return Contact.findOne({
    _id: id,
    owner,
  });
};

const createContact = ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, fields, owner) => {
  return Contact.findByIdAndUpdate({ _id: id, owner }, fields, { new: true });
};

const removeContact = (id, owner) => {
  return Contact.findOneAndRemove({ _id: id, owner });
};

const updateStatusContact = (id, body, owner) => {
  return Contact.findOneAndUpdate({ _id: id, owner }, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
