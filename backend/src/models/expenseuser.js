'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseUser.init({
    fk_UserLogin_id: DataTypes.INTEGER,
    fk_Expense_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExpenseUser',
  });
  return ExpenseUser;
};