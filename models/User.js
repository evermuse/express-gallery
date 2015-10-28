module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {


    });

    User.belongsTo(Photo); //does the inner join


};