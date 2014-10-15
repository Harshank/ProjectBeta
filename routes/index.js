
/*
 * GET home page.
 */

exports.root = function(req, res){
	console.log("HOME");

if(req.user === undefined) {
		var user = ""; 
	}else {
		var user = req.user.username; // username i/p field } user object;
	}
  if(user.length >1){
  		res.redirect('/homepg');
  } else {
  		res.render('home', { title: 'Yelp' });

  }

};

exports.user = function(req,res) {
	for(var prop in req.user) {
		console.log("*************"+prop+" : "+req.user[prop]);
	}
	if(req.user.userId === undefined) {
		res.redirect('/');
	} else {
		res.redirect('/homepg');
	}
}
