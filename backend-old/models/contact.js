'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      phone_number: DataTypes.STRING
    },
    {}
  );
  Contact.associate = function (models) {
    Contact.belongsTo(models.Supplier, {
      onDelete: 'CASCADE'
    });

    Contact.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };
  return Contact;
};
