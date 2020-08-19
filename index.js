var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');  // query로 method값을 받아서 request의 HTTP method를 바꿔주는 역할
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

app.get('/contacts/:id', function(req, res){
  db.Contact.findOne({_id:req.params.id}, function (err, contact) {
    if (err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});

app.get('/contacts/:id/edit', function(req, res){
  db.Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});

app.put('/contacts/:id', function (req, res) {
  db.Contact.findOneAndUpdate({_id:req.params.id}, req.body, function (err, contact) {
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});

app.delete('/contacts/:id', function (req, res) {
  db.Contact.deleteOne({_id:req.params.id}, function (err) {
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});



var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
