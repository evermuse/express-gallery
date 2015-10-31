var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/isUser/', function (req, res) {

  db.users.findOne({ where: {username : req.body.username }}) //comes over as object -- we use bodyparser to get the key value
   .then(function(user) {

      if (!user) {

        res.send( {success : false });

      } else {

        res.send({success: true});

      }

    })
   .catch(function(err) {

      console.log(err);

    })

});

router.post('/signup/', function (req, res) {



});

router.post('/login/', function (req, res) {



});




module.exports = router;