var express = require('express');
var app = express();

//denote jade as view engine and view location
app.set('view engine', 'jade');
app.set('views', './views');

//defer all gallery routes to gallery router
var gallery = require('./routes/gallery');
app.use('/gallery', gallery);

//look to public for static pages
app.use(express.static('public'));

//where index is located
app.get('/', function(req, res) {

  res.render('index');

});

//start up the server & define port
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('example app listening a http://%s%s', host, port);

});
