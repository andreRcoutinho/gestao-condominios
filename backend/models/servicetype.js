'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceType = sequelize.define('ServiceType', {
    service_type: DataTypes.STRING
  }, {});
  ServiceType.associate = function (models) {
    ServiceType.belongsToMany(models.Supplier, {
      through: 'supplier_has_service_type'
    })
  };
  return ServiceType;
};