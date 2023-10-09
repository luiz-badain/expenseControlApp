const Expense = require('../models').Expense;
const ExpenseUser = require('../models').ExpenseUser;

//Cadastrar Despeza do usuário (POST)
const add = async (req, res) => {
    const { expenseName, isFixedExpense, isVariableExpense, valueExpense } = req.body;
    const { id } = req.params; // Assumindo que 'id' seja o 'idUser'
    
    try {
        // Crie a despesa
        const expense = await Expense.create({ expenseName, isFixedExpense, isVariableExpense, valueExpense });
        const idExpense = expense.id;

        // Crie o relacionamento entre o usuário e a despesa
        const expenseUser = await ExpenseUser.create({ fk_UserLogin_id: id, fk_Expense_id: idExpense });
        
        res.status(200).json({ message: 'Cadastrado com sucesso', expenseUser });
    } catch (error) {
        console.error('Erro ao cadastrar despesa do usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar despesa do usuário' });
    }
};


module.exports = {
    add
    // all,
    // specific,
    // update,
    // del
};
