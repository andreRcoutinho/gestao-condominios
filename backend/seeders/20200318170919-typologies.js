'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Typologies',
      [
        {
          typology: 'T4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          typology: 'T4 Duplex',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          typology: 'Loja',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typologies', null, {});
  }
};
