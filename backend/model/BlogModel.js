const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    blogType:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:false
    },
    author:{
        type:String,
        required:true
    },
    categories:{
        type:[String],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    publishedDate:{
        type:Date,
        required:true
    },
    approved:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamp:true})

module.exports = mongoose.model("Blog",BlogSchema);