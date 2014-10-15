var RestrSchema = require('../../schema/restr');
exports.addRestaurant = function(req,res){
	if(req.user.userId === undefined) {
		res.redirect('/');
	} else {
	var userId = req.user.userId;
	var userName = req.user.username;
		new RestrSchema({
			name:req.param("name"),
			rank:req.param("rank"),
			comments:req.param("comments"),
			commentedBy:req.param(userId),
		}).save(function(err,doc){
			if(err)res.json(err);
			else res.redirect('/homepg');
		});
	}
};