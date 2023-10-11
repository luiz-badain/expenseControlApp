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

const update = async (req, res) => {
    const { id } = req.params; // Este é o ID da despesa do usuário que está sendo alterada
    const { expenseName, isFixedExpense, isVariableExpense, valueExpense } = req.body;
    try {
        // Consulta a despesa pelo ID para obter o valor da despesa
        const expenseUser = await ExpenseUser.findByPk(id);
        if (!expenseUser) {
            return res.status(404).json({ message: 'Despesa de usuário não encontrada' });
        }

        // Pegando o valor da despeza a partir do objeto
        const oldValueExpense = parseFloat((await Expense.findByPk(expenseUser.fk_Expense_id)).valueExpense);

        // Consulte o usuário para obter o valor atual de 'costOfLiving'
        const user = await UserLogin.findByPk(expenseUser.fk_UserLogin_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const currentCostOfLiving = user.costOfLiving;

        // Calcule a nova somatória
        const newCostOfLiving = parseFloat(currentCostOfLiving) + parseFloat(valueExpense) - parseFloat(oldValueExpense);

        // Atualize 'costOfLiving' na tabela de usuários
        await UserLogin.update({ costOfLiving: newCostOfLiving }, { where: { id: user.id } });

        // Atualizar Despeza do Usuário
        await Expense.update(
            { expenseName, isFixedExpense, isVariableExpense, valueExpense },
            {
                where: { id: expenseUser.fk_Expense_id },
            }
        );

        res.status(200).json({ message: 'Despeza Atualizada com sucesso' });


    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        res.status(500).json({ message: 'Erro ao atualizar despesa', error });
    }
};

const del = async (req, res) => {
    const { id } = req.params; // Este é o ID da despesa do usuário que está sendo excluída

    try {
        // Consulta a despesa pelo ID para obter o valor da despesa
        const expenseUser = await ExpenseUser.findByPk(id);
        if (!expenseUser) {
            return res.status(404).json({ message: 'Despesa de usuário não encontrada' });
        }
        
        // Exclua a entrada da despesa das tabelas 'Expense' e 'ExpenseUser'
        await ExpenseUser.destroy({ where: { id: id } });
        await Expense.destroy({ where: { id: expenseUser.fk_Expense_id } });


        res.status(200).json({ message: 'Despesa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ message: 'Erro ao excluir despesa', error });
    }
};


module.exports = {
    add,
    allByUser,
    // specific,
    update,
    del
};
