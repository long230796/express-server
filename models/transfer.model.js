var mongoose = require('mongoose')

// create schema
var transferSchema = new mongoose.Schema({
	sender: String,
	senderId: String,
	senderAccount: Number,
	senderMonney: Number,
	receiver: String
});

var Transfer = mongoose.model('Transfer', transferSchema, 'transfer')

module.exports = Transfer;
