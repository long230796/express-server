var express = require('express');
var router = express.Router();
var multer = require('multer');
var controller = require('../controllers/index.controller.js');

router.get('/', controller.getIndex);

module.exports = router


