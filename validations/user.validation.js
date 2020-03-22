module.exports.postCreate = function(req, res, next) {
	var errors = [];

	if (!req.body.name)
		errors.push('name is require')

	if (!req.body.password)
		errors.push('phone is require')

	if (!req.body.avatar)
		errors.push('avatar is require')

	if (errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body		// gia tri ma nguoi dung nhap len
		})
		return;
	}
	res.locals.success = true;      // luu tru gia tri local trong req va res, chuyen tiep gia tri cho middleware tiep theo
	next();
	
}

