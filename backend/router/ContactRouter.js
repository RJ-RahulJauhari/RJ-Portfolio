const router = require('express').Router();
const {updateContact,getAllContacts,getContactById,deleteContact,addContact} = require('../controller/ContactController');
const { validateToken } = require('../controller/JWT');

// GET all contacts
router.get('/',validateToken, getAllContacts);

// GET contact by ID
router.get('/',validateToken, getContactById);

// POST add a new contact
router.post('/', addContact);

// DELETE contact by ID
router.delete('/',validateToken, deleteContact);

// PUT update contact by ID
router.put('/',validateToken,updateContact);

module.exports = router;