var express = require('express');
var router = express.Router();
var multer = require('multer');
var controller = require('../controllers/users.controller.js');
var validate = require('../validations/user.validation.js');
var authMiddleware = require('../middleware/auth.middleware.js')


var upload = multer({ dest: './public/uploads/'});

router.get('/', authMiddleware.requireAuth, controller.getIndex)

router.get('/cookie', function(req, res) {
	res.cookie('users-id', 12345);
	res.send('hello');
})

router.get('/search', controller.getSearch)

router.get('/create', controller.getCreate);

// router.get('/:id', controller.getId);

router.get('/status', controller.getStatus);

router.post('/status', controller.postStatus);

router.post('/create',
 upload.single('avatar'),
 validate.postCreate,
 controller.postCreate
);

module.exports = router;