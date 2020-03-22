var Status = require('../models/userStatus.model.js')

module.exports.getIndex = async function(req, res) {
	var status = await Status.find()
	var cookies = req.signedCookies.userId
	res.render('index', {
	 	cookie: cookies,
	 	status: status,
	});  /*path render(views), object*/
}