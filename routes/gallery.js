var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.send('All gallery photos');

});

router.post('/gallery', function(req, res) {

  res.send('create a new gallery photo');

});

router.get('/gallery/new', function(req, res) {

  res.send('see a new photo based on form. fields include: author, link, & description');

});

router.route('/gallery/:id')
  .get(function(req, res) {

    res.send('See a single gallery photo identified by the :id param');

  })
  .put(function(req, res) {

    res.send('update a single gallery photo identified by the :id param');

  })
  .delete(function(req, res) {

    res.send('delete a single gallery photo identified by the :id param');

  });

router.get('/gallery/:id/edit', function(req, res) {

  res.send('see a form to edit a gallery photo identified by the :id param');

});

module.exports = router;