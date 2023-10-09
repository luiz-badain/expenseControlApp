const Expense = require('../models').Expense;
const ExpenseUser = require('../models').ExpenseUser;
const UserLogin = require('../models').UserLogin;

//Cadastrar Despeza do usuário (POST)
const add = async (req, res) => {
    const { expenseName, isFixedExpense, isVariableExpense, valueExpense } = req.body;
    const { id } = req.params; // Este é o id do Usuário
    
    try {
        // Crie a despesa
        const expense = await Expense.create({ expenseName, isFixedExpense, isVariableExpense, valueExpense });
        const idExpense = expense.id;
        
        // Consulte o usuário para obter o valor atual de 'costOfLiving'
        const user = await UserLogin.findByPk(id);
        const currentCostOfLiving = user.costOfLiving;

        // Calcule a nova somatória
        const newCostOfLiving = parseFloat(currentCostOfLiving) + parseFloat(valueExpense);

        // Atualize 'costOfLiving' na tabela de usuários
        await UserLogin.update({ costOfLiving: newCostOfLiving }, { where: { id } });


        // Crie o relacionamento entre o usuário e a despesa
        const expenseUser = await ExpenseUser.create({ fk_UserLogin_id: id, fk_Expense_id: idExpense });
        
        res.status(200).json({ message: 'Cadastrado com sucesso', expenseUser });
    } catch (error) {
        console.error('Erro ao cadastrar despesa do usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar despesa do usuário' });
    }
};

const allByUser = async (req, res) => {
    const { id } = req.params; // Este é o ID do usuário
    try {
      // Execute uma consulta SQL para selecionar todas as despesas do usuário com base no ID do usuário
      const userExpenses = await ExpenseUser.sequelize.query(
        `SELECT *
         FROM user_expense
         WHERE fk_UserLogin_id = :id`, 
        {
          replacements: { id },
          type: ExpenseUser.sequelize.QueryTypes.SELECT,
        }
      );
  
      res.status(200).json({ userExpenses });
    } catch (error) {
      console.error('Erro ao buscar despesas do usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar despesas do usuário' });
    }
  };
  



module.exports = {
    add,
    allByUser
    // specific,
    // update,
    // del
};
