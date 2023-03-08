const Contact = require('./schemas/contact');

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async id => {
  return Contact.findById(id);
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const removeContact = id => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, body) => {
  return Contact.findOneAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
