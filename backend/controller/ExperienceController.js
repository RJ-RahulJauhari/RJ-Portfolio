const ExperienceModel = require('../model/ExperienceModel');

// Create a new experience
const createExperience = async (req, res) => {
    const experienceData = req.body;

    try {
        const createdExperience = await ExperienceModel.create(experienceData);
        res.status(201).json(createdExperience);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read all experiences
const getAllExperiences = async (req, res) => {
    try {
        const experiences = await ExperienceModel.find();
        res.status(200).json(experiences);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read a specific experience by ID
const getExperienceById = async (req, res) => {
    const experienceId = req.params.id;

    try {
        const experience = await ExperienceModel.findById(experienceId);
        
        if (experience) {
            res.status(200).json(experience);
        } else {
            res.status(404).send(`Experience not found with ID: ${experienceId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Update a specific experience by ID
const updateExperienceById = async (req, res) => {
    const experienceId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedExperience = await ExperienceModel.findByIdAndUpdate(
            experienceId,
            updatedData,
            { new: true } // Return the modified document rather than the original
        );

        if (updatedExperience) {
            res.status(200).json(updatedExperience);
        } else {
            res.status(404).send(`Experience not found with ID: ${experienceId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Delete a specific experience by ID
const deleteExperienceById = async (req, res) => {
    const experienceId = req.params.id;

    try {
        const deletedExperience = await ExperienceModel.findByIdAndDelete(experienceId);

        if (deletedExperience) {
            res.status(200).json(deletedExperience);
        } else {
            res.status(404).send(`Experience not found with ID: ${experienceId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getAllExperiencesSorted = async (req, res) => {
    try {
        const experiences = await ExperienceModel.find().sort({ startDate: -1 });

        if (experiences && experiences.length > 0) {
            res.status(200).json(experiences);
        } else {
            res.status(404).send("No experiences found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getExperiencesByTitle = async (req, res) => {
    const experienceTitle = req.query.title;

    try {
        const experiences = await ExperienceModel.find({
            title: { $regex: new RegExp(experienceTitle, 'i') }
        });

        if (experiences && experiences.length > 0) {
            res.status(200).json(experiences);
        } else {
            res.status(404).send(`No experiences found with the title: ${experienceTitle}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


module.exports = {
    getAllExperiencesSorted,
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperienceById,
    deleteExperienceById,
    getExperiencesByTitle,
};
