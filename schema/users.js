var mongoose = require('mongoose');
module.exports = mongoose.model('users',{
	id: Number,
	name: String,
	password: String,
	email: String
});