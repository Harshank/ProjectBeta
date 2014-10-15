var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
// authenticate user
 var mongoose = require('mongoose');
 var UserSchema = require('./schema/users');
 var users = mongoose.model('users',UserSchema);

passport.use(new LocalStrategy(
	function(username, password, done) {
	 	users.findOne({name:username},function(err,docs){
	 		if(!err) {
	 			if(docs) return done(null, {username: docs.name,userId:docs.id}); // username..User object
	 			else console.log("No matches");
	 		}
	 		else {
	 			console.log(err);
	 		}
		return done(null, false);
	 	});
 	}
));

passport.serializeUser(function(user, done) {
	done(null, user); // pass USer object in session
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;