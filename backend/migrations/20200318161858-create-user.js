'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      IBAN: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      NIF: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      user_password_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Password',
          key: 'id'
        },
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Role',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
