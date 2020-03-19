var User = require('../models/user.model.js')
var shortid = require('shortid')

module.exports.getIndex = async function(req, res) {
	var users = await User.find()  // tim trong database neu co du lieu thi render + users
		res.render("users/index", {
			users: users
		});
	// User.find(function(err, users) {
	// 	if (err) return console.log(err);
	// 	res.render("users/index", {
	// 		users: users
	// 	});
	// 	console.log(users)
	// });
};

module.exports.getSearch = function(req, res) {
	var q = req.query.q;  /*{q: 'th', age: '10'}*/
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	res.render('users/index', {
		users: matchedUsers
	});
};

module.exports.getCreate = function(req, res) {
	res.render('users/create')
};

module.exports.getId = async function(req, res) {
	var id = req.params.id;	

	var users = await User.find({ id: id })  // tim trong database neu co du lieu thi render + users
		res.render('users/view', {
			users: users
		});
};

module.exports.postCreate = function(req, res) {  	/*khi nhap vao create client send post request*/
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	var user = new User(req.body);

	user.save(function (err, user) {
		if (err) return console.error(err);
      	console.log(user.name + " saved to users collection.");	
	})

	res.redirect('/auth/login');
	
};

