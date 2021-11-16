var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Company = new Schema({
    companyname:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required:true
    },
    position:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    about:{
        type: String, 
        default : ''
    },
    vacancies:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Vacancy', 
    },
    appointments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Appointment',
    }    
});

module.exports = mongoose.model('Company',Company);