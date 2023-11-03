'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserIncomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_Income_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Incomes', key: 'id'},
        onDelete: 'CASCADE'
      },
      fk_UserLogin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'UserLogins', key: 'id'},
        onDelete: 'CASCADE'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserIncomes');
  }
};