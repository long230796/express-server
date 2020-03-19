var express = require('express');
var router = express.Router();
var controller = require('../controllers/transfer.controller.js')
var authMiddleware = require('../middleware/auth.middleware.js')

router.get('/',authMiddleware.requireAuth, controller.create);
router.post('/create', controller.postCreate);

module.exports = router