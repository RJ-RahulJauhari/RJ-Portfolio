const {sign,verify} = require('jsonwebtoken');

const createTokens = (user) => {
    // When ever this function is used we create a access token which is signed with our ACCESS_TOKEN_SECRET,
    // we have to also specify the expiration date on the token, which is 15 min for this particular token. 
    const accessToken = sign({name:user.name, _id:user._id,email:user.email,phone:user.phone,userType:user.userType}
        ,process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1d"});
    return accessToken;
};


// Middleware to validate token....
// This is special middleware which is called in every route of our application which requires token verification,
// if the user is not logged in he/she would not be able to use the API endpoints we have created.  
const validateToken = (req,res,next) => {
    const accessToken = req.cookies['token']; 
    console.log("accessToken: ",accessToken);
    if(!accessToken) return res.status(401).send("User not authenticated...");

    try{
        verify(accessToken,process.env.ACCESS_TOKEN_SECRET, async (err,data) =>{
            if (err) {
                res.status(403).send("Token is not valid...")
            }else{
                req.authenticated = true;
                next();
            }
        });
    }catch(error){
        return res.status(500).send(error);
    }

}


module.exports = {createTokens,validateToken};