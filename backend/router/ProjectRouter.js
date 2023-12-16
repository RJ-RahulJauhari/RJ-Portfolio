const express = require('express');
const router = express.Router();
const projectController = require('../controller/ProjectController');
const { validateToken } = require('../controller/JWT');

// Create a new project
router.post('/add',validateToken, projectController.createProject);

// Read all projects
router.get('/getAll', projectController.getAllProjects);

// Read a specific project by ID
router.get('/get/:id', projectController.getProjectById);

// Update a specific project by ID
router.patch('/update/:id',validateToken, projectController.updateProjectById);

// Delete a specific project by ID
router.delete('/delete/:id',validateToken, projectController.deleteProjectById);

// Get all projects sorted by start date in descending order
router.get('/getAllSorted', projectController.getAllProjectsSorted);

// Get projects by title
router.get('/getByTitle', projectController.getProjectsByTitle);

// Get projects by category
router.get('/getByCategory', projectController.getProjectsByCategory);

module.exports = router;

