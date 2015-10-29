var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var db = require('./models');
var bodyparser = require('body-parser');

//bring in database models
//var User = db.user;
var Photo = db.photo;

//allows the post requests to be parsed
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));

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

    Photo.findAll( { limit : 8, order : '"updatedAt" DESC' } )
     .then(function (data) {

        res.render('index', {

            title : 'Express Gallery',
            listings : data

        });

    });

});

//allow users to add a photo

app.post('/gallery/', function (req, res) {

    Photo.create({

        image : req.body.url,
        title : req.body.title,
        description : req.body.description,
        link : req.body.url

    })
    .then(function (newPhoto) {

        res.redirect('/'); //'/gallery/' + newPhoto.id

    });
});

//todo create all remaining routes

app.get('/gallery/:id', function (req, res) {

    var listingId = req.params.id;

    Photo.find({

        where : {

            id : listingId

        }

    })
    .then(function (listing) {

        if (listingId !== null) {

            res.render('detail', {

                listing : listing.dataValues

            });

        } else {

            res.send('404');

        }

    });

});

//start up the server & define port
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Express Gallery listening at http://localhost', host, port);

});
