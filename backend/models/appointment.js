var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment = new Schema({
    vacancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy'
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    problem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    meetinglink:{
        type: String
    },
    code:{
        type: String
    },
    status:{
        type: String,
        default: "pending"
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Appointment',Appointment);
