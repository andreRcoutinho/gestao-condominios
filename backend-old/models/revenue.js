'use strict';
module.exports = (sequelize, DataTypes) => {
  const Revenue = sequelize.define('Revenue', {
    month: DataTypes.STRING,
    payment_date: DataTypes.DATE,
    is_payed: DataTypes.BOOLEAN
  }, {});
  Revenue.associate = function (models) {
    Revenue.belongsTo(models.Unit);

    Revenue.belongsTo(models.Payment_Map);
  };
  return Revenue;
};