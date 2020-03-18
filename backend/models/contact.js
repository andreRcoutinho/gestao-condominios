'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Contact.associate = function (models) {
    Contact.belongsTo(models.Supplier, {
      foreignKey: 'supplier_id',
      onDelete: 'Cascade'
    });

    Contact.belongsTo(models.User), {
      foreignKey: 'user_id',
      onDelete: 'Cascade'
    }
  };
  return Contact;
};