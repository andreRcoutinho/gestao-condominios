'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    IBAN: DataTypes.STRING,
    NIF: DataTypes.STRING
  }, {});
  Supplier.associate = function (models) {
    Supplier.hasMany(models.Contact, {
      foreignKey: 'supplier_id',
      as: 'contacts'
    });
  };
  return Supplier;
};