var mongoose = require('mongoose')

// create schema
var userStatusSchema = new mongoose.Schema({
	writerId: String,
	writer: String,
	status: String,
	avatar: String
});

var Status = mongoose.model('Status', userStatusSchema, 'status')

module.exports = Status;
