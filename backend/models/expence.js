'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expence = sequelize.define('Expence', {
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    payment_date: DataTypes.DATE
  }, {});
  Expence.associate = function (models) {
    Expence.belongsTo(models.Supplier)
  };
  return Expence;
};