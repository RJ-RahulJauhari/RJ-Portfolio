const mongoose = require('mongoose');

const InstitutionSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    institutionType:{
        type: String,
        enum: ['primary','secondary','others'],
        required:true
    },
    class:{
        type:String,
        required:true
    },
    board:{
        type:String,
        require:false
    },
    startYear:{
        type: Date,
        require: true
    },
    endYear:{
        type: Date,
        require: true
    },
    score:{
        type: Number,
        max:100,
        required: true
    },
    scoreUnit:{
        type:String,
        required:true
    },
    societies:{
        type: [String],
        required:false
    },
    achievements:{
        type:[String],
        require:false
    },
    description:{
        type:String,
        required:false
    },
},{ timestamps: true });

module.exports = mongoose.model("Institution",InstitutionSchema);


