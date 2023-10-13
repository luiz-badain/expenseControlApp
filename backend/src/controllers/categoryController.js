const { Op } = require('sequelize');


const Category = require('../models').Category;
const CategoryExpense = require('../models').CategoryExpense;
const CategoryTag = require('../models').CategoryTag;
const Tag = require('../models').Tag;
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

//Busca Por id da categoria
const categoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria', error);
        res.status(500).json({ message: 'Erro ao buscar categoria' });
    }
};

//Busca Por Nome da categoria
const categoryByName = async (req, res) => {
    const name = req.params.categoryName; // Ou o nome do parâmetro que você está usando

    try {
        const categories = await Category.findAll({
            where: {
                categoryName: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias por nome', error);
        res.status(500).json({ message: 'Erro ao buscar categorias por nome' });
    }
};


const categoriesByExpense = async (req, res) => {
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

//Altera Categoria por ID (PUT)
const update = async (req, res) => {
    const { categoryName } = req.body;
    try {
        await Category.update(
            { categoryName },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json({ message: 'categoria Atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar categoria', error);
        res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
};

const deleteCategoryExpense = async (req, res) => {
    const { id } = req.params; // Este é o ID da categoria de despeza que está sendo excluída

    try {
        // Consulta a despesa pelo ID para obter o valor da despesa
        const categoryExpense = await CategoryExpense.findByPk(id);
        if (!categoryExpense) {
            return res.status(404).json({ message: 'Categoria de despeza não encontrada' });
        }

        // Exclua a entrada da categoria de despesa 
        await CategoryExpense.destroy({ where: { id: id } });

        res.status(200).json({ message: 'Categoria de Despesa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir categoria de despesa:', error);
        res.status(500).json({ message: 'Erro ao excluir categoria de despesa', error });
    }
};

const del = async (req, res) => {
    const { id } = req.params; // Este é o ID da categoria de despeza que está sendo excluída

    try {
        // Consulta a categoria pelo ID para obter o valor da despesa
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoria de despeza não encontrada' });
        }

        // Exclua a entrada da categoria
        await Category.destroy({ where: { id: id } });

        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ message: 'Erro ao excluir categoria', error });
    }
};


// Tags de categoria

// cadastra uma tag
const addTag = async (req, res) => {
    const tagName = `#${req.body.tagName}`;
    try {
        const tag = await Tag.create({ tagName });
        res.status(200).json({ message: 'Tag Cadastrada com sucesso', tag });
    } catch (error) {
        console.error('Erro ao cadastrar Tag:', error);
        res.status(500).json({ message: 'Erro ao cadastrar tag' });
    }
};

// cadastro de tag de categoria
const addCategoryTag = async (req, res) => {
    const { id } = req.params; // Este é o id da categoria
    const tagName = `#${req.body.tagName}`; // A tag que será cadastrada

    try {
        const tag = await Tag.create({ tagName });
        const idTag = tag.id;
        const categoryTag = await CategoryTag.create({ fk_Category_id: id, fk_Tag_id: idTag });
        res.status(200).json({ message: 'Tag de categoria Cadastrada com sucesso', categoryTag });
    } catch (error) {
        console.error('Erro ao cadastrar tag da categoria de despeza:', error);
        res.status(500).json({ message: 'Erro ao cadastrar tag da categoria de despeza' });
    }
};


// retorna todas as tags
const allTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        console.error('Erro ao buscar tags', error);
        res.status(500).json({ message: 'Erro ao buscar tags' });
    }
};

// retorna tag pelo id
const TagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        res.status(200).json(tag);
    } catch (error) {
        console.error('Erro ao buscar tag', error);
        res.status(500).json({ message: 'Erro ao buscar tag' });
    }
};


//Busca Por Nome da Tag
const TagByName = async (req, res) => {
    const name = req.params.TagName; // Ou o nome do parâmetro que você está usando

    try {
        const tags = await Tag.findAll({
            where: {
                tagName: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        res.status(200).json(tags);
    } catch (error) {
        console.error('Erro ao buscar tags por nome', error);
        res.status(500).json({ message: 'Erro ao buscar tags por nome' });
    }
};

// busca todas as tags pela categoria
const tagsByCategory = async (req, res) => {
    const { id } = req.params; // Este é o id da categoria

    try {
        // Execute uma consulta SQL para selecionar todas as despesas do usuário com base no ID do usuário
        const categoryTag = await CategoryTag.sequelize.query(
            `SELECT * FROM category_tag WHERE fk_Category_id = :id`,
            {
                type: CategoryTag.sequelize.QueryTypes.SELECT,
                replacements: { id },
            }
        );

        res.status(200).json(categoryTag);
    } catch (error) {
        console.error('Erro ao buscar tags da categoria', error);
        res.status(500).json({ message: 'Erro ao buscar tags da categoria' });
    }
};

//Altera Categoria por ID (PUT)
const updateTag = async (req, res) => {
    const tagName = `#${req.body.tagName}`;
    try {
        await Tag.update(
            { tagName },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json({ message: 'Tag Atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar Tag', error);
        res.status(500).json({ message: 'Erro ao atualizar Tag' });
    }
};

// deleta tag
const deleteTag = async (req, res) => {
    const { id } = req.params; // Este é o ID da categoria de despeza que está sendo excluída

    try {
        // Consulta a categoria pelo ID para obter o valor da despesa
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag de despeza não encontrada' });
        }

        // Exclua a entrada da categoria
        await Tag.destroy({ where: { id: id } });

        res.status(200).json({ message: 'Tag excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir tag:', error);
        res.status(500).json({ message: 'Erro ao excluir tag', error });
    }
};

const deleteCategoryTag = async (req, res) => {
    const { id } = req.params; // Este é o ID da tag de categoria  que está sendo excluída

    try {
        // Consulta a tag de categoria pelo ID para obter o valor da despesa
        const categoryTag = await CategoryTag.findByPk(id);
        if (!categoryTag) {
            return res.status(404).json({ message: 'tag de Categoria não encontrada' });
        }

        // Exclua a entrada da categoria de despesa 
        await CategoryTag.destroy({ where: { id: id } });

        res.status(200).json({ message: 'tag de Categoria excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir tag de categoria:', error);
        res.status(500).json({ message: 'Erro ao excluir tag de categoria', error });
    }
};

module.exports = {
    add,
    addCategoryExpense,
    all,
    categoryById,
    categoryByName,
    categoriesByExpense,
    update,
    del,
    deleteCategoryExpense,
    addTag,
    addCategoryTag,
    allTags,
    TagById,
    TagByName,
    tagsByCategory,
    updateTag,
    deleteTag,
    deleteCategoryTag
};
