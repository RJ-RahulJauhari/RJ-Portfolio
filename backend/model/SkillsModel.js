const mongoose = require('mongoose');

const SkillsSchema = mongoose.Schema({
    skill:{
        type: String,
        required:true
    },
    category:{
        type:String,
        enum:['frontend','backend','framework','programminglanguage','others'],
        default:'others'
    },
    userID:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Skills",SkillsSchema);

