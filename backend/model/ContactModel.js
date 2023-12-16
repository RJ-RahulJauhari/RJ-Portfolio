const mongoose = require('mongoose')


const ContactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    contactPurpose:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Contact",ContactSchema);
