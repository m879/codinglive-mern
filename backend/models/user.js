var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
        facebookId: String,
        googleId:String,
        usertype:{
            type:String,
            default: '',
        },
        active: {
            type: Boolean,
            default: true,
        },
        firstname:{
            type: String,
            default: String,
        },
        lastname:{
            type: String,
            default: ''
        }        
    },{
        timestamps: true
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);