'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      role_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};
