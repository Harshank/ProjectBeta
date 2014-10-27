exports.tweet = function(req,res) {
	var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query;
console.log('********************************************'+query);
}