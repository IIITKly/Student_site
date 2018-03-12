var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
	username:String,
	first_name : String,
	last_name:String,
	email:String,
	password:String


});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);
