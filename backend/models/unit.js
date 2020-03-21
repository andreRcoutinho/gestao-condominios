'use strict';
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    'Unit',
    {
      unit: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Unit.associate = function (models) {
    // associations can be defined here
    Unit.belongsTo(models.Typology, {
      onDelete: 'CASCADE'
    });

    Unit.hasMany(models.Revenue, {
      foreignKey: 'unit_id'
    })

    Unit.belongsToMany(models.User, {
      through: 'user_has_unit'
    });
  };
  return Unit;
};
