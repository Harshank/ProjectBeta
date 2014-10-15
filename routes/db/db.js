var mongoose = require('mongoose');
mongoose.connect('mongodb://Harshank:password@ds033760.mongolab.com:33760/proj');
module.exports = mongoose.connection;