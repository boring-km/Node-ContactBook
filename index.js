var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');  // query로 method값을 받아서 request의 HTTP method를 바꿔주는 역할
var app = express();

// DB Setting
require('./database/db')();

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

var port = 3000;
app.listen(port, function () {
  console.log('server on! http://localhost:' + port);
});
