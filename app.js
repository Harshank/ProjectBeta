
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var usersdb = require('./routes/db/usersdb');
var restaurantdb = require('./routes/db/restaurantdb');
var home = require('./routes/home/home');
var http = require('http');
var path = require('path');
var passport = require('./auth');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var app = express();
// database connection
var db = require('./routes/db/db');
db.on('error',console.error.bind(console,'connection error: '));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.methodOverride());
app.use(cookieParser());
app.use(expressSession({secret: process.env.SESSION_SECRET || 'yelp'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var tweet = require('twitter'),
twitter = new tweet({
	consumer_key:'G9FS0rwt1rR1cIejHFf4i09Wr',
	consumer_secret:'uSTRfwLyOhkSD9uScFNxiWfYEaWepHd3a8kS1ZCRgJjiSGxKbV',
	access_token_key:'57118132-iynPffZ9IU9oC9bMjwJfQYLDSiszBP7NoocCN6qS3',
	access_token_secret:'Fst4dU3mD5u1DZTT1n4Q1sFPhnm5rHXPjWJmic4qvz0Nx'
}),
util = require('util');
// **************************************************************************************************************************
// *********** STREAM TWITTER ***************
// twitter.stream('statuses/filter',{track:'love'},function(stream) {	
//     stream.on('data', function(data) {
//     	if(data.text != undefined){
//     		var text = data.text.toLowerCase();
//         console.log(util.inspect(data));
    		
//     	}
//     });

//     setTimeout(stream.destroy, 1000);
// });
// ************* STATUS REST CALL TWITTER *****************
// twitter.get('/statuses/show/27523302233.json', {include_entities:true}, function(data) {
//     console.log(util.inspect(data));
// });

// twitter
//     .verifyCredentials(function(data) {
//         console.log(util.inspect(data));
//     })
//     .updateStatus('Test tweet from my node APP' ,
//         function(data) {
//             console.log(util.inspect(data));
//         }
//     );
// ************** Search statuses **********88
twitter.search('La Victoria Taqueria', function(data) {
    console.log(util.inspect(data));

});    
// twitter.searchUser('HarshankV', function(data) {
//     for(var i=0;i<data.length;i++) {
//     	console.log(data[i].name);
// 	}
// });

// ***************************************************************************************************************************

app.get('/registerUser', usersdb.addUser);
app.get('/addRestaurant', restaurantdb.addRestaurant);

app.get('/', routes.root);
app.get('/homepg', home.homepage);
app.post('/login',passport.authenticate('local',{
	successRedirect:'/user',
	failureRedirect:'/'
}));
app.post('/logout',function(req,res){
	req.logout();
	res.redirect('/');
})
app.get('/user', routes.user);

// app.get('/Restaurant',function(req,res){
// 	mongoose.model('Restaurant').find(function(err,Restaurant){
// 		res.send(Restaurant);
// 	});
// });

	http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
