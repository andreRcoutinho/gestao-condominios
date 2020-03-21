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

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.User_Password);

    User.hasOne(models.Role);

    User.hasMany(models.Contact, {
      foreignKey: 'user_id',
      as: 'contacts',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.Unit, {
      through: 'user_has_unit'
    });
  };
  return User;
};
