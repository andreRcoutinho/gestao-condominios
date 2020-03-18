'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Password = sequelize.define(
    'User_Password',
    {
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password_expires_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {}
  );
  User_Password.associate = function(models) {
    // associations can be defined here
  };
  return User_Password;
};
