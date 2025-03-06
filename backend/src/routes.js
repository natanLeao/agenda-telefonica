const express = require('express');
const contactsController = require('./controllers/contactsController');
const router = express.Router();

router.get(`/teste`, contactsController.getContacts);
router.get(`/contatos`, contactsController.getContacts);
router.post(`/contatos`, contactsController.addContact);
router.put(`/contatos/id`, contactsController.updateContact);
router.delete(`/contatos/id`, contactsController.deleteContact);

module.exports = router; 
