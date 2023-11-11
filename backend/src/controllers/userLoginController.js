const UserLogin = require('../models').UserLogin;
const bcrypt = require('bcrypt');
const passport = require('passport');

//Cadastra Autor (POST)
const add = async (req, res) => {
    const { userName, userEmail, userPassword, costOfLiving, totalIncomeUser } = req.body;
    const salt = await bcrypt.genSalt(10); //Essa função gera um número aleatório que é adicionado a senha para aumentar a segurança da criptografia
    const passwordHash = await bcrypt.hash(userPassword, salt);//Criptografa a senha passa para a constante
    const user = await UserLogin.create({ userName, userEmail, userPassword: passwordHash, costOfLiving, totalIncomeUser });
    res.status(200).json({ message: 'Cadastrado com sucesso', user });
};

//Realiza o login e dependo do resultado redireciona para uma rota especifica
const login = async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user/login/Success',
        failureRedirect: '/user/login/failure'
    })(req, res, next);
};
//Se o login tiver sucesso
const loginSuccess = async (req, res) => {
    return res.status(200).json({message: 'Usuário logado com sucesso'});
}

//Se o login falhar
const loginFailure = async (req, res) => {
    return res.status(401).json({message: 'Credenciais incorretas!'})
}

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
    const salt = await bcrypt.genSalt(10); //Essa função gera um número aleatório que é adicionado a senha para aumentar a segurança da criptografia
    const passwordHash = await bcrypt.hash(userPassword, salt);//Criptografa a senha passa para a constante
    await UserLogin.update(
        { userName, userEmail,  userPassword: passwordHash, costOfLiving, totalIncomeUser },
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
    login,
    loginSuccess,
    loginFailure,
    all,
    specific,
    update,
    del
};