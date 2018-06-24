'use strict';
module.exports = (sequelize, DataTypes) => {
  var Credential = sequelize.define('Credential', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    login: DataTypes.STRING
  }, {});
  Credential.associate = function(models) {
    // associations can be defined here
  };
  return Credential;
};