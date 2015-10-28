var listingsArray = require('./listingsArray');

module.exports = function(sequelize, DataTypes) {

    var Photo = sequelize.define('Photo', {

        image : DataTypes.STRING,
        link : DataTypes.STRING,
        description : DataTypes.TEXT

    });

    Photo.belongsTo(User); //does the inner join

    Photo.sync({ force: true })
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

