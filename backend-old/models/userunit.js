'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserUnit = sequelize.define('UserUnit', {
    user_id: DataTypes.UUID,
    unit_id: DataTypes.UUID
  }, {});
  UserUnit.associate = function(models) {
    // associations can be defined here
  };
  return UserUnit;
};