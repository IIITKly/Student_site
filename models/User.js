var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
	first_name : String,
	last_name:String,
	username:String,
	email:String,
	password:String


});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);