const fs = require('fs/promises');
const { resolve } = require('path');

const contactsPath = resolve('./models/contacts.json');

const getContacts = async (_, res) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    if (!contacts) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const [contact] = contacts.filter(contact => {
      return contact.id === contactId;
    });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const { name, email, phone } = req.body;
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
    return res.json(newContact);
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(el => el.id !== contactId);
    if (contacts.length === filteredContacts.length) {
      return res.status(404).json({ message: 'Not found' });
    }
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    if (!body) {
      res.status(400).res.json({ message: 'missing fields' });
    }
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return res.status(404).res.json({ message: 'Not found' });
    }
    contacts[index] = { ...contacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return res.status(200).json(contacts[index]);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
