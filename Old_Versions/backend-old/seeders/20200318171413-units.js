'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Unit',
      [
        {
          unit: 'Loja',
          typology_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '1º Esquerdo',
          typology_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '3º Esquerdo',
          typology_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '5º Esquerdo',
          typology_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '7º Esquerdo',
          typology_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '1º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '2º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '3º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '4º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '5º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '6º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '7º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          unit: '8º Direito',
          typology_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Unit', null, {});
  }
};
