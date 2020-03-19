var mongoose = require('mongoose')

// create schema
var userSchema = new mongoose.Schema({
	email: String,
	password: String,
	name: String,
	avatar: String,
	account: Number
});

// chuyen doi userSchema thanh User, luu vao collection users
//muon lay du lieu hay luu giu lieu vao database thi fiel schema phai trung voi fiel cua database

var User = mongoose.model('User', userSchema, 'users')


	// // a document instance
	// var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });

module.exports = User; // co the dung User o cac cho khac	