var mongoose = require('mongoose');
module.exports = mongoose.model('restaurant',{
	id: Number,
	name: String,
	rank: Number,
	comments: String,
	commentedBy: String
});