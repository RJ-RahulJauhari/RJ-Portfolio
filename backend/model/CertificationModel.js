const mongoose = require('mongoose');

const CertificationSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },
    credId:{
        type:String,
        required:false
    },
    credUrl:{
        type:String,
        required:false
    },
    certificateUrl:{
        type:String,
        required:true
    },
    institutionLogo:{
        type:String,
        required:true
    },
    skillsLearned:{
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
},{timestamp:true})

module.exports = mongoose.model("Certification",CertificationSchema);