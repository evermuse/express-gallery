var listingsArray = require('../listingsArray');
//var db = require('./models');
//var User = db.user;

module.exports = function(sequelize, DataTypes) {

    var Photo = sequelize.define('photo', {

        image : DataTypes.STRING,
        link : DataTypes.STRING,
        description : DataTypes.TEXT

    });

    //Photo.belongsTo(User); //does the inner join

    Photo.sync({ force: true }) // force will always drop the db and reinitialize
        .then(function() {

            listingsArray.listings.forEach(function(listing) {

                Photo.create({

                    image : listing.image,
                    link : listing.link,
                    description : listing.description

                });

            });

        });

    return Photo;

};

