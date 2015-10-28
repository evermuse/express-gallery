var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var db = require('./models');

//bring in database models
var User = db.User;
var Photo = db.Photo;

//denote jade as view engine and view location
app.set('view engine', 'jade');
app.set('views', './views');

//necessary to communicate with livereload
app.use(livereload({ port : 35729 }));

//defer all gallery routes to gallery router
var gallery = require('./routes/gallery');
app.use('/gallery', gallery);

//look to public for static pages
app.use(express.static('public'));

//where index is located
app.get('/', function(req, res) {

  //can add render functionality here with object

  res.render('index', {

    Photo.findAll()
     .then(function (photos) {

        res.json(photos);

    });

  });

});

//todo create all remaining routes

app.get('/gallery/:id', {



});



//start up the server & define port
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Express Gallery listening at http://%s%s', host, port);

});
