const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imagesUrl:{
        type:[String],
        required:false
    },
    logoUrl:{
        type:String,
        required:false
    },
    videoUrl:{
        type:String,
        required:false
    },
    githubUrl:{
        type:String,
        required:true
    },
    deploymentUrl:{
        type:String,
        required:false
    },
    skillsUsed:{
        type:[String],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
})

module.exports = mongoose.model("Project",ProjectSchema);