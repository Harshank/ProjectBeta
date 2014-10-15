
/*
 * GET users listing.
 */
var url = require('url');
var restr = require('restr');
var mongoose = require('mongoose');
var RestaurantSchema = require('../../schema/restr');
var restr = mongoose.model('restaurant',RestaurantSchema);

exports.homepage = function(req, res){
	console.log('IN HOMEPAGE');
	var restrData =[];

	if(req.user === undefined) {
		var user = ""; 
	}else {
		var user = req.user.username; // username i/p field  user object;
	}
  if(user.length >1){
 	restr.find({},function(err,docs){
 		if(!err) {
 			restrData = docs;
		  	console.log(restrData);
		  	res.render('homepage',{username:user,restrList:restrData});
 		}
 		else {
 			res.end("Error getting Restaurant data");
 		}
 	});
  } else {
  		res.writeHead(302,{'Location':'/'});
  		res.end();

  }
};