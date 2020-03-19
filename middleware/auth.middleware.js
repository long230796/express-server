var db = require('../db.js')
var User = require("../models/user.model.js")
module.exports.requireAuth = function (req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return
	}	 

	User.find({ _id: req.signedCookies.userId })
		.then(function(userCookie) {
			res.locals.user = userCookie;
			next();
		})
		.catch(function(err) {
			res.redirect('/auth/login');
		})

	// var userCookie = db.get('users').find({ id: req.signedCookies.userId }).value(); 

	// if (!userCookie) {
	// 	res.redirect('/auth/login');
	// 	return
	// }

	// res.locals.user = userCookie;
	
	// next();

}