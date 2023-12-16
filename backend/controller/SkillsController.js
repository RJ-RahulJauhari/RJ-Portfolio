const SkillsModel = require("../model/SkillsModel");
const UserModel = require("../model/UserModel");


const addSkill = async (req,res) => {
    const data = req.body;
    try {
        const task = await SkillsModel.create(data);
        if(task){
            console.log(task);
            res.status(200).send("Added successfully!")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

const deleteSkill = async (req,res) => {
    const skillID = req.query.id;
    try {
        const task = await SkillsModel.findByIdAndDelete(skillID);
        if(task){
            console.log(task);
            res.status(200).send("Deleted successfully!")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

const updateSkill = async (req,res) => {
    const skillID = req.query.id;
    const skill = req.body;
    try {
        const task = await SkillsModel.findByIdAndUpdate(skillID,skill);
        if(task){
            console.log(task);
            res.status(200).send("Updated successfully!")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

const getSkillByID = async (req,res) => {
    const skillID = req.query.id;
    try {
        const data = await SkillsModel.findById(skillID);
        if(data){
            console.log(data);
            res.status(200).send(data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

const getSkillsByUserID = async (req,res) => {
    const UserID = req.query.id;
    try {
        const data = await SkillsModel.find({userID:UserID});
        if(data){
            console.log(data);
            res.status(200).send(data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

const getSkillsByUserIDAndCategory = async (req,res) => {
    const UserID = req.query.id;
    const Category = req.query.category;
    try {
        const data = await SkillsModel.find({userID:UserID,category:Category});
        if(data){
            console.log(data);
            res.status(200).send(data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 


module.exports = {
    addSkill,
    deleteSkill,
    updateSkill,
    getSkillByID,
    getSkillsByUserID,
    getSkillsByUserIDAndCategory
}