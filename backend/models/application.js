var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Application = new Schema({
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
    }
});
module.exports = mongoose.model('Application',Application);