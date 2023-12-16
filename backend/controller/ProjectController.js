const ProjectModel = require('../model/ProjectModel');

// Create a new project
const createProject = async (req, res) => {
    const projectData = req.body;

    try {
        const createdProject = await ProjectModel.create(projectData);
        res.status(201).json(createdProject);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read a specific project by ID
const getProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await ProjectModel.findById(projectId);
        
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).send(`Project not found with ID: ${projectId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Update a specific project by ID
const updateProjectById = async (req, res) => {
    const projectId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            projectId,
            updatedData,
            { new: true } // Return the modified document rather than the original
        );

        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            res.status(404).send(`Project not found with ID: ${projectId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Delete a specific project by ID
const deleteProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

        if (deletedProject) {
            res.status(200).json(deletedProject);
        } else {
            res.status(404).send(`Project not found with ID: ${projectId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get all projects sorted by start date in descending order
const getAllProjectsSorted = async (req, res) => {
    try {
        const projects = await ProjectModel.find().sort({ startDate: -1 });

        if (projects && projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(404).send("No projects found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get projects by title
const getProjectsByTitle = async (req, res) => {
    const projectTitle = req.query.title;

    try {
        const projects = await ProjectModel.find({
            title: { $regex: new RegExp(projectTitle, 'i') }
        });

        if (projects && projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(404).send(`No projects found with the title: ${projectTitle}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get projects by category
const getProjectsByCategory = async (req, res) => {
    const projectCategory = req.query.category;

    try {
        const projects = await ProjectModel.find({
            category: { $regex: new RegExp(projectCategory, 'i') }
        });

        if (projects && projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(404).send(`No projects found in the category: ${projectCategory}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    getAllProjectsSorted,
    getProjectsByTitle,
    getProjectsByCategory,
};