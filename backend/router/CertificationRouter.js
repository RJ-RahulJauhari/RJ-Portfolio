const express = require('express');
const router = express.Router();
const certificationController = require('../controller/CertificationController');
const { validateToken } = require('../controller/JWT');

// Create a new certification
router.post('/add',validateToken, certificationController.createCertification);

// Read all certifications
router.get('/getAll', certificationController.getAllCertifications);

// Read a specific certification by ID
router.get('/get/:id', certificationController.getCertificationById);

// Update a specific certification by ID
router.patch('/update/:id',validateToken, certificationController.updateCertificationById);

// Delete a specific certification by ID
router.delete('/delete/:id',validateToken, certificationController.deleteCertificationById);

// Get all certifications sorted by start date in descending order
router.get('/getAllSorted', certificationController.getAllCertificationsSorted);

// Get certifications by title
router.get('/getByTitle', certificationController.getCertificationsByTitle);

module.exports = router;
