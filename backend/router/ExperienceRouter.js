const express = require('express');
const router = express.Router();
const experienceController = require('../controller/ExperienceController');
const { validateToken } = require('../controller/JWT');

// Create a new experience
router.post('/add',validateToken, experienceController.createExperience);

// Read all experiences
router.get('/getAll', experienceController.getAllExperiences);

// Read a specific experience by ID
router.get('/get/:id', experienceController.getExperienceById);

// Update a specific experience by ID
router.patch('/update/:id',validateToken, experienceController.updateExperienceById);

// Delete a specific experience by ID
router.delete('/delete/:id',validateToken, experienceController.deleteExperienceById);

// Get all experiences sorted by start date
router.get('/getAllSorted', experienceController.getAllExperiencesSorted);

// Get experiences by title
router.get('/getByTitle', experienceController.getExperiencesByTitle);

module.exports = router;
