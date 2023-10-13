const Income = require('../models').Income;
const UserIncome = require('../models').UserIncome;

const add = async (req, res) => {
    const { incomeName, valueIncome } = req.body;
    const { id } = req.params;

    try {
        const income = await Income.create({ incomeName, valueIncome });
        const idIncome = income.id;

        const userIncome = await UserIncome.create({ fk_UserLogin_id: id, fk_Income_id: idIncome });

        res.status(200).json({ message: 'Cadastrado com sucesso', userIncome });
    } catch (error) {
        console.error('Erro ao cadastrar renda do usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar renda do usuário', error });
    }
};

const incomeByUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userIncomes = await UserIncome.sequelize.query(
            `SELECT * FROM user_income WHERE fk_UserLogin_id = :id`,
            {
                type: UserIncome.sequelize.QueryTypes.SELECT,
                replacements: { id },
            }
        );

        res.status(200).json(userIncomes);
    } catch (error) {
        console.error('Erro ao buscar rendas do usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar rendas do usuário', error });
    }
};

//const allByUser = async (req, res) => {
//};

const update = async (req, res) => {
    const { id } = req.params;
    const { incomeName, valueIncome } = req.body;

    try {
        const userIncome = await UserIncome.findByPk(id);
        if (!userIncome) {
            return res.status(404).json({ message: 'Renda do usuário não encontrada' });
        }

        await Income.update(
            { incomeName, valueIncome },
            {
                where: { id: userIncome.fk_Income_id }
            }
        );

        res.status(200).json({ message: 'Renda atualizada com sucesso' });

    } catch (error) {
        console.error('Erro ao atualizar renda:', error);
        res.status(500).json({ message: 'Erro ao atualizar renda', error });
    }
};

const del = async (req, res) => {
    const { id } = req.params;

    try {
        const userIncome = await UserIncome.findByPk(id);
        if (!userIncome) {
            return res.status(404).json({ message: 'Renda de usuário não encontrada' });
        }
        await UserIncome.destroy({ where: { id: id } });
        await Income.destroy({ where: { id: userIncome.fk_Income_id } });

        res.status(200).json({ message: 'Renda excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        res.status(500).json({ message: 'Erro ao excluir despesa:', error });
    }
};

module.exports = {
    add,
    incomeByUser,
    // allByUser,
    update,
    del
};