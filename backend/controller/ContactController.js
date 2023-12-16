const ContactModel = require('../model/ContactModel');



const getAllContacts = async (req,res) => {
    try {
        const data = await ContactModel.find({});
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send("No contacts found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getContactById = async (req,res) => {
    const id = req.query.id;
    try {
        const data = await ContactModel.find({_id:id});
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const addContact = async (req,res) => {
    const contact = req.body;
    try {
        const data = await ContactModel.create(contact);
        if(data){
            res.status(200).send(data);
        }else{
            res.status(400).send('Could not send contact details');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteContact = async (req,res) => {
    const id = req.query.id;
    try {
        const data = await ContactModel.findByIdAndDelete(id);
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateContact = async (req,res) => {
    const id = req.query.id;
    const updatedData = req.body;
    try {
        const data = await ContactModel.findByIdAndUpdate(id,updatedData,{ new: true });
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    addContact,
    updateContact,
    deleteContact,
    getAllContacts,
    getContactById
}