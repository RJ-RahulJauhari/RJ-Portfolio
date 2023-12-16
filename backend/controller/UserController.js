const UserModel = require('../model/UserModel.js');

// Hero Functions
// Getting Hero Data
const createHero = async (req,res) => {
    const HeroData = req.body;
    try {
        const hero = await UserModel.findOne({userType: "admin"});
        if(hero){
            return res.status(200).send(`${hero.name} is already the admin, please contact Rahul Jauhari for any changes...`)
        }
        const task = await UserModel.create({...HeroData,userType:"admin"});
        res.status(200).send(task);
        console.log("Hero has been created....");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteHero = async (req,res) =>{
    try {
        const task = await UserModel.deleteOne({userType:"admin"});
        res.status(200).send("Hero has been deleted...")
        console.log("Hero has been deleted...")
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const getHero = async (req,res) => {
    try {
        const HeroData = await UserModel.findOne({userType:"admin"});
        if(!HeroData){
            return res.status(200).send("No hero data avalible...")
        }
        res.status(200).send(HeroData);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const updateHero = async (req,res) => {
    const updatedHeroData = req.body;
    try {
        await UserModel.updateOne({userType:"admin"},updatedHeroData);
        res.status(200).send("Hero has been updated...");
        //console.log(updatedHeroData);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}


// User Functions

const getAllUsers = async (req,res) =>{
    try {
        const Users = await UserModel.find({userType:"user"});
        if(Object.keys(Users).length === 0){
            return res.status(404).send("No users found...");
        }
        res.status(200).send(Users);
        console.log("All user have been fetched....");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}


const createUser = async (req,res) => {
    const HeroData = req.body;
    try {
        const task = await UserModel.create(HeroData);
        res.status(200).send(task);
        console.log("User has been created....");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteUser = async (req,res) =>{
    const userId = req.params.id;
    try {
        const task = await UserModel.deleteOne({_id:userId});
        res.status(200).send("User has been deleted...")
        console.log("User has been deleted...")
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const getUser = async (req,res) => {
    const userId = req.params.id;
    try {
        const UserData = await UserModel.findOne({_id:userId});
        if(!UserData){
            return res.status(200).send("No user data availible...")
        }
        res.status(200).send(UserData);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const updateUser = async (req,res) => {
    const userID = req.query.id;
    const updatedUserData = req.body;
    try {
        await UserModel.updateOne({_id:userID},updatedUserData);
        res.status(200).send("User has been updated...");
        //console.log(updatedHeroData);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}



module.exports = {
    getHero,
    updateHero,
    deleteHero,
    createHero,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
}