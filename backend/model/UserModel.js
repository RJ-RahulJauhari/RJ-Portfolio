const mongoose = require("mongoose");
const SkillsModel = require("./SkillsModel");

const UserSchema = new mongoose.Schema({
    userType:{
        type:String,
        enum:['admin','user'],
        default: 'user',
        required:true,
    },
    name: {
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: false
    },
    currentDesignation:{
        type: String,
        required: false
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    social:{
        type: [String],
        required:false
    },
    tagline:{
        type:String,
        required: false
    },
    description:{
        type: String,
        required:false
    },
    location:{
        type: String,
        required: false,
    },
    photoUrl:{
        type:String,
        required: false
    },
    coverUrl:{
        type: String,
        required: false
    },
    resume:{
        type:String,
        required: false
    }
},{ timestamps: true })

module.exports = mongoose.model("User", UserSchema);