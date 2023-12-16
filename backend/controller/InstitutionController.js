const InstitutionModel = require('../model/InstitutionModel');

// CRUD on Institutions

const addInstitution = async (req, res) => {
    const institutionData = req.body;
    try {
        const createdInstitution = await InstitutionModel.create(institutionData);
        if (createdInstitution) {
            res.status(200).send(`Institution added successfully: ${createdInstitution.name}`);
        } else {
            res.status(500).send("Failed to add institution");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const getInstitution = async (req, res) => {
    const ID = req.query.id;
    try {
        const institution = await InstitutionModel.find({ _id: ID });

        if (institution && institution.length > 0) {
            res.status(200).send(institution);
        } else {
            res.status(404).send(`Institution not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const deleteInstitution = async (req, res) => {
    const ID = req.query.id;
    try {
        const deletedInstitution = await InstitutionModel.findByIdAndDelete(ID);

        if (deletedInstitution) {
            res.status(200).send(`Institution deleted successfully: ${deletedInstitution.name}`);
        } else {
            res.status(400).send(`Institution not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const updateInstitution = async (req, res) => {
    const institutionId = req.query.id; // Assuming the ID is part of the request parameters
    const updatedData = req.body; // Assuming the updated data is present in the request body

    try {
        const updatedInstitution = await InstitutionModel.findByIdAndUpdate(
            institutionId,
            updatedData,
            { new: true } // Return the modified document rather than the original
        );

        if (updatedInstitution) {
            res.status(200).send(`Institution updated successfully: ${updatedInstitution.name}`);
        } else {
            res.status(404).send(`Institution not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


// Special Operations on Institutions

const getInstitutionsByName = async (req, res) => {
    const institutionName = req.query.name;
    try {
        // Using a case-insensitive regex to match institution names
        const institutions = await InstitutionModel.find({
            name: { $regex: new RegExp(institutionName, 'i') }
        });

        if (institutions && institutions.length > 0) {
            res.status(200).send(institutions);
        } else {
            res.status(404).send(`No institutions found with the name: ${institutionName}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const getAllInstitutions = async (req, res) => {
    try {
        let institutions;

        institutions = await InstitutionModel.find().sort({ startYear: -1 });

        if (institutions && institutions.length > 0) {
            res.status(200).send(institutions);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const getPrimaryInstitutions = async (req, res) => {
    try {
        let institutions;

        institutions = await InstitutionModel.find({ institutionType: 'primary' }).sort({ startYear: -1 });

        if (institutions && institutions.length > 0) {
            res.status(200).send(institutions);
        } else {
            res.status(404).send("No primary institutions found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getSecondaryInstitutions = async (req, res, sorted) => {
    try {
        let institutions;

        institutions = await InstitutionModel.find({ institutionType: 'secondary' }).sort({ startYear: -1 });

        if (institutions && institutions.length > 0) {
            res.status(200).send(institutions);
        } else {
            res.status(404).send("No secondary institutions found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getOtherInstitutions = async (req, res) => {
    try {
        let institutions;

        institutions = await InstitutionModel.find({ institutionType: 'others' }).sort({ startYear: -1 });
        
        if (institutions && institutions.length > 0) {
            res.status(200).send(institutions);
        } else {
            res.status(404).send("No other institutions found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getPrimaryInstitutions,
    getSecondaryInstitutions,
    getOtherInstitutions,
    getInstitution,
    updateInstitution,
    deleteInstitution,
    addInstitution,
    getAllInstitutions,
    getInstitutionsByName,
};
