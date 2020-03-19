var mongoose = require('mongoose')

// create schema
var sessionSchema = new mongoose.Schema({
	sessionId: String 
});

var Session = mongoose.model('Session', sessionSchema, 'session')

module.exports = Session;
