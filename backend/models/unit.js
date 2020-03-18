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
  Unit.associate = function(models) {
    // associations can be defined here
    Unit.belongsTo(models.Typology, {
      foriengKey: 'typology_id',
      onDelete: 'Cascade'
    });
  };
  return Unit;
};
