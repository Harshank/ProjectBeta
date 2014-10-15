
var UserSchema = require('../../schema/users');
exports.addUser = function(req,res){
	if(req.user.userId === undefined) {
		new UserSchema({
			id:req.param("id"),
			name:req.param("name"),
			password:req.param("password"),
			email:req.param("email")
		}).save(function(err,doc){
			if(err)res.json(err);
			else res.redirect('/');
		});
	} else {
		res.redirect('/');
	}
};