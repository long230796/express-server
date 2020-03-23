var User = require('../models/user.model.js')
var Status = require('../models/userStatus.model.js')
var shortid = require('shortid')

module.exports.getIndex = async function(req, res) {
	var cookies = req.signedCookies.userId
	var users = await User.find()  // tim trong database neu co du lieu thi render + users
		res.render("users/index", {
			users: users,
			cookie: cookies
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

// module.exports.getId = async function(req, res) {
// 	var id = req.params.id;	

// 	var users = await User.find({ id: id })  // tim trong database neu co du lieu thi render + users
// 		res.render('users/view', {
// 			users: users
// 		});
// };

module.exports.postCreate = function(req, res) {  	/*khi nhap vao create client send post request*/
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	var user = new User(req.body);

	user.save(function (err, user) {
		if (err) return console.error(err);
      	console.log(user.name + " saved to users collection.");	
	})

	res.redirect('/auth/login');
	
};

module.exports.getStatus = async function(req, res) {
	var cookies = req.signedCookies.userId
	var writer = await Status.find({ writerId: cookies });
	var status = writer[0].status
	res.render('users/status', {
		status: status,
		cookie: cookies
	})
}

module.exports.postStatus = async function(req, res) {
	var userId = req.signedCookies.userId;
	var user = await User.find({ _id: userId });
	req.body.avatar = user[0].avatar
	req.body.writer = user[0].name;
	req.body.writerId = user[0]._id

	var status = new Status(req.body);

	status.save(function(err, status) {
			if (err) return console.log(err);
			console.log(status.status + " saved to status collection.");
	})
	res.redirect('/')

}

module.exports.postNewStatus = async function(req, res) {
	var cookie = req.signedCookies.userId
	var writer = await Status.findOne({writerId: cookie});
	var newStatus = {status: req.body.newStatus}

	await writer.updateOne(newStatus)

	res.redirect('/');
}

