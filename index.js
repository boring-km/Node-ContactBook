var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var db = require('./db.js');

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', function(req, res){
  res.redirect('/contacts');
});

app.get('/contacts', function(req, res){
  db.Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

app.post('/contacts', function(req, res){
  db.Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});


var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
