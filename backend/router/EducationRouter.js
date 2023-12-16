const express = require('express');
const router = express.Router();
const institutionController = require('../controller/InstitutionController');
const { validateToken } = require('../controller/JWT');

// CRUD on Institutions
router.post('/add',validateToken, institutionController.addInstitution);
router.get('/get', institutionController.getInstitution);
router.delete('/delete',validateToken, institutionController.deleteInstitution);
router.patch('/update',validateToken, institutionController.updateInstitution);

// Special Operations on Institutions
router.get('/getByName', institutionController.getInstitutionsByName);
router.get('/getAll', institutionController.getAllInstitutions);
router.get('/getPrimary', institutionController.getPrimaryInstitutions);
router.get('/getSecondary', institutionController.getSecondaryInstitutions);
router.get('/getOther', institutionController.getOtherInstitutions);

module.exports = router;
