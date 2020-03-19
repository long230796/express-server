// var db = require('../db')
// var shortid = require('shortid')
var Transfer = require('../models/transfer.model.js')
var User = require('../models/user.model.js')

module.exports.create = function(req, res) {
	res.render('./transfer/create', {
		// csrfToken: req.csrfToken()
	});
}

module.exports.postCreate = async function(req, res) {

	var userId = req.signedCookies.userId;
	var account = req.body.accountId

//promise
	// User.find({ _id: userId })
	// 	.then(function(users) {
	// 		return User.find({ account: account})
	// 					.then(function(account){
	// 						var transfer = new Transfer({
	// 							sender: users[0].name,
	// 							senderId: users[0]._id,
	// 							senderAccount: parseInt(req.body.accountId),
	// 							senderMonney: parseInt(req.body.Amount),
	// 							receiver: account[0].name				
	// 						})

	// 						transfer.save(function(err, transfer) {
	// 							if (err) return console.log(err);
	// 						})
	// 						res.redirect('/transfer')
	// 					})
	// 	})
	// 	.catch(function(err) {
	// 		console.log(err)
	// 	})

//Promise.all
	// Promise.all([
	// 	User.find({ _id: userId }),
	// 	User.find({ account: account})
	// ])
	// .then(function(values) {
	// 	var transfer = new Transfer({
	// 		sender: values[0][0].name,
	// 		senderId: values[0][0]._id,
	// 		senderAccount: parseInt(req.body.accountId),
	// 		senderMonney: parseInt(req.body.Amount),
	// 		receiver: values[1][0].name				
	// 	})

	// 	transfer.save(function(err, transfer) {
	// 		if (err) return console.log(err);
	// 	})
	// 	res.redirect('/transfer')		
	// })
//using async await	
	var users = await User.find({ _id: userId });
	var account = await User.find({ account: account});

	var transfer = new Transfer({
		sender: users[0].name,
		senderId: users[0]._id,
		senderAccount: parseInt(req.body.accountId),
		senderMonney: parseInt(req.body.Amount),
		receiver: account[0].name				
	})

	transfer.save(function(err, transfer) {
			if (err) return console.log(err);
	})
	res.redirect('/transfer')		

		

	// var data = {
	// 	id: shortid.generate(),
	// 	account: req.body.accountId,
	// 	amount: parseInt(req.body.Amount),
	// 	userId: req.signedCookies.userId
	// }
	// db.get('transfer').push(data).write();

	// res.redirect('/transfer')
}