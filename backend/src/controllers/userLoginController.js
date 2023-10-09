
const UserLogin = require('../models').UserLogin;



//Cadastra Autor (POST)
const add = async (req, res) => {
    const { userName, userEmail, userPassword, costOfLiving, totalIncomeUser } = req.body;
    const user = await UserLogin.create({ userName, userEmail, userPassword, costOfLiving, totalIncomeUser });
    res.status(200).json({ message: 'Cadastrado com sucesso', user });
};

//Busca todos os usuários (GET)
const all = async (req, res) => {
    const users = await UserLogin.findAll();
    res.status(200).json(users);
};

//Busca Por id do usuário (GET)
const specific = async (req, res) => {
    const id = req.params;
    const user = await UserLogin.findByPk(req.params.id);
    res.status(200).json(user);
};

//Altera usuário por ID (PUT)
const update = async (req, res) => {
    const { userName, userEmail, userPassword, costOfLiving, totalIncomeUser } = req.body;
    await UserLogin.update(
        { userName, userEmail, userPassword, costOfLiving, totalIncomeUser },
        {
            where: { id: req.params.id },
        }
    );
    res.status(200).json({ message: 'Atualizado com sucesso' });
};

//Deleta usuário por id (DELETE)
const del = async (req, res) => {
    await UserLogin.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ message: 'Excluído com sucesso' })
};

module.exports = {
    add,
    all,
    specific,
    update,
    del
};