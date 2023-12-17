const express = require('express')
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const UserRoute = require('./router/UserRouter');
const EducationRoute = require('./router/EducationRouter');
const ExperienceRoute = require('./router/ExperienceRouter');
const ProjectRoute = require('./router/ProjectRouter');
const CertificationRoute = require('./router/CertificationRouter');
const BlogRouter = require('./router/BlogRouter');
const AuthRoute = require('./router/AuthRouter');
const SkillsRoute = require('./router/SkillsRouter');
const ContactRoute = require('./router/ContactRouter');


// Server initialization 
const server = express();

// Middleware 
server.use(cookieParser());
server.use(cors({ origin: ['https://rahuljauhari.onrender.com','https://rj-portfolio-admin-panel.onrender.com','https://rj-rahul-jauhari-portfolio.vercel.app','http://localhost:3000', 'http://localhost:3001'], credentials: true }))
server.use(express.urlencoded({extended:true})); // Supports URL-Encoded bodies
server.use(express.json());
server.use('/auth',AuthRoute);
server.use('/users',UserRoute);
server.use('/education',EducationRoute);
server.use('/experience',ExperienceRoute);
server.use('/projects',ProjectRoute);
server.use('/certifications',CertificationRoute);
server.use('/blogs',BlogRouter);
server.use('/skills',SkillsRoute);
server.use('/contacts',ContactRoute);

// PORT 
const PORT = process.env.PORT;

// Starting server on above PORT
server.listen(PORT, async () =>{
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING,)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) =>{
        console.log("Something went wrong while connection...")
        console.log(error);
    })
    console.log(`Server has started on PORT: ${PORT}`);
    console.log(`Server URL is: http://localhost:${PORT}`);
})