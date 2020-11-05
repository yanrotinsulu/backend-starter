'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userFullName: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
    isLocked: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};