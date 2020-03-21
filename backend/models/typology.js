'use strict';
module.exports = (sequelize, DataTypes) => {
  const Typology = sequelize.define(
    'Typology',
    {
      typology: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Typology.associate = function (models) {
    Typology.hasMany(models.Unit, {
      foreignKey: 'typology_id'
    });
  };
  return Typology;
};
