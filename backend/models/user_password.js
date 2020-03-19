'use strict';

var bcrypt = require('bcryptjs');
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
    {
      hooks: {
        beforeCreate: User_Password => {
          var salt = bcrypt.genSaltSync(10);
          User_Password.password_hash = bcrypt.hashSync(
            User_Password.password_hash,
            salt
          );
        }
      }
    }
  );
  User_Password.associate = function(models) {
    // associations can be defined here
    //User_Password.belongsTo(models.User);
  };
  return User_Password;
};
