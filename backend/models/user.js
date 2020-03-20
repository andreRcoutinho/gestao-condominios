'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
      },
      role_id: DataTypes.INTEGER,
      user_password_id: DataTypes.INTEGER
    },
    {}
  );

  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.User_Password, {
      foreignKey: 'user_password_id'
    });

    User.belongsTo(models.Role, {
      foreignKey: 'role_id'
    });

    User.hasMany(models.Contact, {
      foreignKey: 'user_id',
      as: 'contacts'
    });

    User.belongsToMany(models.Unit, {
      foreignKey: 'user_id',
      through: 'UserUnits',
      as: 'units'
    });
  };
  return User;
};
