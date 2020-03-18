'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      IBAN: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      NIF: {
        type: DataTypes.STRING(9),
        allowNull: false
      }
    },
    {}
  );

  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.user_password, {
      foreignKey: 'user_password_id'
    });

    User.hasOne(models.role, {
      foreignKey: 'role_id'
    });
  };
  return User;
};
