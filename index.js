var express	= require('express');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var sessionMiddleware = require('./middleware/session.middleware.js')
var transferRoute = require('./routes/transfer.route.js')
var apiUserRoute = require('./api/routes/user.route.js')
var csurf = require('csurf');
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/express-demo')

var cookieParser = require('cookie-parser')

var port = 3000;


var app = express();
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asglasdfl'))
//app.use(csurf({ cookie: true }));  //dung cookie de tao token
app.use(express.static('public'))
app.use(sessionMiddleware)


app.get('/', function(request, res) {
	 res.render('index', {
	 	name: 'room'
	 });  /*path render(views), object*/
});

app.use('/users', userRoute);     /*nếu có yêu cầu nào đến '/users' thì check thằng userRoute*/
app.use('/auth', authRoute);
app.use('/transfer', transferRoute);
app.use('/api/users',apiUserRoute);


app.listen(port, function() {
	console.log('server listening on port ' + port);
});