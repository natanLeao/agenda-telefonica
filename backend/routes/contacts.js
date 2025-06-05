
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/contatos', contactsController.getContacts);
router.get('/contatos/:id', contactsController.getContactById);
router.post('/contatos', contactsController.addContact);
router.put('/contatos/:id', contactsController.updateContact);
router.delete('/contatos/:id', contactsController.deleteContact);

module.exports = router;
