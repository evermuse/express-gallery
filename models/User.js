module.exports = function(sequelize, DataTypes) {

  // define new table entry for posting
  var User = sequelize.define('users', {

    username : { type : DataTypes.STRING, unique : true },
    password : DataTypes.STRING

  }, {

    instanceMethods : {

      validPassword : function (password) {

        return (password === this.password);

      }

    },

    freezeTableName: true

  });

  User.sync({ force: true });

  return User;

};