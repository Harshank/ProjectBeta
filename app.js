
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
app.set('port', process.env.PORT);
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
