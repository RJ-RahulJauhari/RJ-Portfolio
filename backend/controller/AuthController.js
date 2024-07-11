const UserModel = require("../model/UserModel");
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { createTokens } = require("./JWT");

// USER LOGIN AND REGISTER FUNCTIONS
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // 1. Checking if a user is present:
        const user = await UserModel.findOne({ email: email,userType:"user"});

        if (user) {
            return res.status(400).send("User already exists...");
        }
        // 2. Create a new user
        await UserModel.create({
            name: name,
            email: email,
            password: await hash(password, 10),
            phone: phone,
        });

        res.status(200).send("User has been registered...");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again later.");
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res.status(404).send("We could not find you...");
    }
    // Compare the hashed password during login
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).send("Invalid password");
    }
    const accessToken = createTokens(user);
    res.cookie("token",accessToken,{maxAge: 60*60*24*1*1000})
    res.status(200).send(user);
};


// ADMIN LOGIN and REGISTER FUNCTIONS
const registerAdmin = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // 1. Checking if a user is present:
        const admin = await UserModel.findOne({ userType:"admin"});

        if (admin) {
            return res.status(400).send(`${admin.name} is already the admin`);
        }

        // 2. Create a new admin
        await UserModel.create({
            name: name,
            email: email,
            password: await hash(password, 10),
            phone: phone,
            userType:'admin'
        });

        res.status(200).send("Admin has been registered...");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again later.");
    }
};


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    // During Login we first check if the user is present in DB or not 
    const admin = await UserModel.findOne({ email:email, userType: "admin" });
    if (!admin) {
        return res.status(404).send("We could not find you...");
    }
    // Compare the hashed password during login
    // Then we compare the hashed passwords match or not 
    const passwordMatch = await compare(password, admin.password);
    if (!passwordMatch) {
        return res.status(401).send("Invalid password");
    }

    // If the passwords match we create a token for the user and place it in the cookies on the client side. 
    // We are also passing the users data along with the token that would be stored in the token in encrypted form. 
    // To make use of that data we "verify" the accesstoken in the refetch function, which is called every refresh of
    // the pages.  
    const accessToken = createTokens(admin);
    res.cookie("token",accessToken,{maxAge: 60*60*24*1*1000}).status(200)
    res.status(200).send(admin);
};


const logout = async (req,res) => {
    try {
        // Apon logout we just clear the access token 
        res.clearCookie('token', { sameSite: "none", secure: true }).status(200).send("User logged out successfully")
    } catch (error) {
        res.status(500).json(error)
    }

}


const refetch = async (req,res) => {
    try {

        // Apon every refresh we call this function, if the token is present in the cookie section,
        // then we verify that token with our ACCESS_TOKEN_SECRET.
        // If the token is valid then we send the data with the user info to the frontend where it could be used.
        const token = req.cookies.token;
        verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, data) => {
            if (err) {
                return res.status(401).send(err)
            }
            res.status(200).send(data)
            console.log(token);
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { login, register, loginAdmin, registerAdmin, logout, refetch };
