'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExpenseUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_UserLogin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'userlogins', key: 'id'},
        onDelete: 'CASCADE'
      },
      fk_Expense_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'expenses', key: 'id'},
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
    await queryInterface.dropTable('ExpenseUsers');
  }
};