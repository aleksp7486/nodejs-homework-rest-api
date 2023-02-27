const fs = require('fs/promises');
const { resolve } = require('path');

const contactsPath = resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter(contact => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(el => el.id !== contactId);
    if (contacts.length === filteredContacts.length) {
      return false;
    }
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return false;
    }
    contacts[index] = { ...contacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
