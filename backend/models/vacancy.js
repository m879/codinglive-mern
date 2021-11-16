var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vacancy = new Schema({
    position:{
        type:String,
        required: true,
    },
    companyname:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    skills:{
        type: [String],
        required: true 
    },
    commencement:{
        type: Date,
        required: true, 
    },
    duration:{
        type: Number,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    applicants:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Candidate'
    },  
    selected:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Candidate'
    },  
    problem: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Problem'
    }  
 },{
    timestamps:true
});

module.exports = mongoose.model('Vacancy',Vacancy);