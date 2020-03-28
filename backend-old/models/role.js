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

  Role.associate = function (models) {
    Role.belongsTo(models.User, {
      foreignKey: 'role_id'
    });
  };
  return Role;
};
