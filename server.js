var express = require('express');
var app = express();
var session = require('express-session');
var livereload = require('connect-livereload');
var db = require('./models');
var bodyparser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//necessary to communicate with livereload
app.use(livereload({ port : 35729 }));

//denote jade as view engine and view location
app.set('view engine', 'jade');
app.set('views', './views');

//bring in database models
//var User = db.user;
var Photo = db.photo;

//allows the post requests to be parsed
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));

//user authentication - has to be after bodyparser
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//serialize the authentication requests

passport.serializeUser(function(user, done) {

    done(null, user);

});

passport.deserializeUser(function(obj, done) {

    done(null, obj);

});

passport.use(new LocalStrategy(

    function(username, password, done) {

        User.findOne({ username : username }, function (err, user) {

            if (err) { return done(err); }

            if (!user) {

                return done(null, false, { message : 'Incorrect username.' });

            }
            if (!user.validPassword(password)) {

                return done(null, false, { message : 'Incorrect password.' });

            }

            return done(null, user);

        });

    }

));

////defer all gallery routes to gallery router
//var gallery = require('./routes/gallery');
//app.use('/gallery', gallery);

//api route
app.use('/api', require('./routes/api'));

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

//todo add the passport authentication

//app.post('/login',
//    passport.authenticate('local', {
//        successRedirect : '/success',
//        failureRedirect : '/login',
//        failureFlash : true
//    })
//);

app.post('/gallery/', ajaxAuth, function (req, res) {

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

function ajaxAuth(req, res, next) {

    if (req.isAuthenticated()) {

        return res.send(200, 'user is logged in');

    } else {

        //return res.send(401, 'user is not logged in');
        return res.status(401).send('user is not logged in');

    }

}

//start up the server & define port
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Express Gallery listening at http://localhost', host, port);

});

//authentication function

function ensureAuthenticated (req, res, next) {

    if (req.isAuthenticated()) {

        return next();

    }

    res.redirect('login');

}


//todo GET route for add photo form
//todo PUT update a single gallery photo identified by the :id param
//todo DELETE /gallery/:id to delete a single gallery photo identified by the :id param
//todo GET /gallery/:id/edit to see a form to edit a gallery photo identified by the :id param

//// encryption guide
//
//app.post('createUser', function(req, res, err) {
//
//  var password1 = req.body.password;
//  var password2 = req.body.password2;
//
//});
//
//var bcrypt = require('bcrypt');
//
//module.exports = function (sequelize, DataTypes) {
//
//  var User = sequelize.define('users', {
//
//    username : { type : DataTypes.STRING },
//    password : {
//      type: DataTypes.CHAR(16),
//      required: true
//    }
//  }, {
//    instanceMethods : {
//
//      validPassword : function (password) {
//
//        return (bcrypt.hash(password) === this.password );
//    },
//    hooks: {
//
//      beforeCreate: [
//
//        function() {
//
//          this.password = bcrypt.hash(this.password);
//
//        }
//      ]
//    }
//
//  });
//
//  return User;
//
//};
