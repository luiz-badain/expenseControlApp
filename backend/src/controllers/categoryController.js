const Category = require('../models').Category;
const CategoryExpense = require('../models').CategoryExpense;
const CategoryTag = require('../models').CategoryTag;
const CategoryIncome = require('../models').CategoryIncome;

const add = async (req, res) => {
    const { categoryName } = req.body;
    try {
        const category = await Category.create({ categoryName });
        res.status(200).json({ message: 'Categoria Cadastrada com sucesso', category });
    } catch (error) {
        console.error('Erro ao cadastrar categoria:', error);
        res.status(500).json({ message: 'Erro ao cadastrar categoria' });
    }
};

const addCategoryExpense = async (req, res) => {
    const { id } = req.params; // Este é o id da despeza
    const { categoryName } = req.body;

    try {
        const category = await Category.create({ categoryName });
        const idCategory = category.id;
        const categoryExpense = await CategoryExpense.create({ fk_Category_id: idCategory, fk_Expense_id: id });
        res.status(200).json({ message: 'Categoria Cadastrada com sucesso', categoryExpense });
    } catch (error) {
        console.error('Erro ao cadastrar categoria de despeza:', error);
        res.status(500).json({ message: 'Erro ao cadastrar categoria de despeza' });
    }
};

const all = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias', error);
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
};

const allExpenseCategories = async (req, res) => {
    const { id } = req.params; // Este é o id da despeza

    try {
        // Execute uma consulta SQL para selecionar todas as despesas do usuário com base no ID do usuário
        const categoryExpenses = await CategoryExpense.sequelize.query(
            `SELECT * FROM expense_category WHERE fk_Expense_id = :id`,
            {
                type: CategoryExpense.sequelize.QueryTypes.SELECT,
                replacements: { id },
            }
        );

        res.status(200).json(categoryExpenses);
    } catch (error) {
        console.error('Erro ao buscar categorias', error);
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
};



module.exports = {
    add,
    addCategoryExpense,
    all,
    allExpenseCategories
    // specific,
    // update,
    // del
};
