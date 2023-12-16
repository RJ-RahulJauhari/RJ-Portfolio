const CertificationModel = require('../model/CertificationModel');

// Create a new certification
const createCertification = async (req, res) => {
    const certificationData = req.body;

    try {
        const createdCertification = await CertificationModel.create(certificationData);
        res.status(201).json(createdCertification);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read all certifications
const getAllCertifications = async (req, res) => {
    try {
        const certifications = await CertificationModel.find();
        res.status(200).json(certifications);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read a specific certification by ID
const getCertificationById = async (req, res) => {
    const certificationId = req.params.id;

    try {
        const certification = await CertificationModel.findById(certificationId);
        
        if (certification) {
            res.status(200).json(certification);
        } else {
            res.status(404).send(`Certification not found with ID: ${certificationId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Update a specific certification by ID
const updateCertificationById = async (req, res) => {
    const certificationId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedCertification = await CertificationModel.findByIdAndUpdate(
            certificationId,
            updatedData,
            { new: true } // Return the modified document rather than the original
        );

        if (updatedCertification) {
            res.status(200).json(updatedCertification);
        } else {
            res.status(404).send(`Certification not found with ID: ${certificationId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Delete a specific certification by ID
const deleteCertificationById = async (req, res) => {
    const certificationId = req.params.id;

    try {
        const deletedCertification = await CertificationModel.findByIdAndDelete(certificationId);

        if (deletedCertification) {
            res.status(200).json(deletedCertification);
        } else {
            res.status(404).send(`Certification not found with ID: ${certificationId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get all certifications sorted by start date in descending order
const getAllCertificationsSorted = async (req, res) => {
    try {
        const certifications = await CertificationModel.find().sort({ startDate: -1 });

        if (certifications && certifications.length > 0) {
            res.status(200).json(certifications);
        } else {
            res.status(404).send("No certifications found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get certifications by title
const getCertificationsByTitle = async (req, res) => {
    const certificationTitle = req.query.title;

    try {
        const certifications = await CertificationModel.find({
            title: { $regex: new RegExp(certificationTitle, 'i') }
        });

        if (certifications && certifications.length > 0) {
            res.status(200).json(certifications);
        } else {
            res.status(404).send(`No certifications found with the title: ${certificationTitle}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    createCertification,
    getAllCertifications,
    getCertificationById,
    updateCertificationById,
    deleteCertificationById,
    getAllCertificationsSorted,
    getCertificationsByTitle,
};
