'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryExpense.init({
    fk_Category_id: DataTypes.INTEGER,
    fk_Expense_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryExpense',
  });
  return CategoryExpense;
};