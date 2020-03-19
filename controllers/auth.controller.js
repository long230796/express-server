var User = require("../models/user.model.js")
var shortid = require('shortid')

module.exports.login = function(req, res) {
	res.render('auth/login')
};

module.exports.postLogin = async function(req, res) {
	var name = req.body.name;
	var password = req.body.password;

	// var user = db.get('users').find({ name: name }).value();

//using promise

	// User.find({ name: name })
	// 	.then(function(users){
	// 		for (user of users) {
	// 			if (user.password == password) {
	// 				res.cookie('userId', user._id, {
	// 					signed: true
	// 				});
	// 				res.redirect('/users');
	// 				return
	// 			} 
	// 		}
	// 		res.render('auth/login', {
	// 			errors: [
	// 				'password incorrect'
	// 			],
	// 			values: req.body
	// 		});

			
	// 	})
	// 	.catch(function(err) {
	// 		res.render('auth/login', {
	// 			errors: [
	// 				'users does not exist'
	// 			],
	// 			values: req.body
	// 		});
	// 	})
//using async await
var users = await User.find({ name: name });

	if (!users[0]) {
		res.render('auth/login', {
			errors: [
				'users does not exist'
			],
			values: req.body
		});
		return;
	}

	for (user of users) {
		if (user.password == password) {
			res.cookie('userId', user._id, {
				signed: true
			});
			res.redirect('/users');
			return
		} 
	}
	res.render('auth/login', {
		errors: [
			'password incorrect'
		],
		values: req.body
	});

}