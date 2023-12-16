const mongoose = require('mongoose');

const ExperienceSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    experienceType:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:false
    },
    certificateUrl:{
        type:String,
        required:false
    },
    offerLetterUrl:{
        type:String,
        required:false
    },
    companyLogo:{
        type:String,
        required:true
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
},{timestamps:true})

module.exports = mongoose.model("Experience",ExperienceSchema);