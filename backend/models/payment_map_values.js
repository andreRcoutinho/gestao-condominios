'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment_Map_Values = sequelize.define('Payment_Map_Values', {
    value: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    reserve_fund: DataTypes.STRING
  }, {});
  Payment_Map_Values.associate = function (models) {
    Payment_Map_Values.belongsTo(models.Payment_Map);
  };
  return Payment_Map_Values;
};