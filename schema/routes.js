var mongoose = require('mongoose');

module.exports = 
mongoose.model('routes',{
	"TPFIELD15" : String,
	"LINENAME" : String,
	"SCHEDULES" : String,
	"VIDEO" : Number,
	"LINEABBR" : Number,
	"DIRECTIONN" :String,
	"PATTERN" : String,
	"DISTANCE" : Number,
	"DESTINATIO" : String,
	"PATTERNID" : Number,
	"SIGNUPNAME" : String,
	"LINE_TYPE" : String,
	"SHAPE_LEN" :Number
});
