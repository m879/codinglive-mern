var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Problem = new Schema({
    title:{
        type: String, 
        default: ''
    },
    statement:{
        type: String,
        default: ''
    },
    input:{
        type: String,
        default: ''
    },
    output:{
        type: String,
        default: ''
    },
    duration:{
        type: Number,
        required: true
    },
}); 

module.exports = mongoose.model('Problem',Problem);