'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment_Map = sequelize.define('Payment_Map', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Payment_Map.associate = function (models) {
    Payment_Map.hasMany(models.Revenue, {
      foreignKey: 'payment_map_id'
    })

    Payment_Map.hasMany(models.Payment_Map_Values, {
      foreignKey: 'payment_map_id'
    })
  };
  return Payment_Map;
};