const express = require('express');
const router = express.Router();
const contactsController = require('./controllers/contactsController');

router.get('/contatos', contactsController.getContacts);
router.post('/contatos', contactsController.addContact);
router.put('/contatos/:id', contactsController.updateContact);

module.exports = router; 
