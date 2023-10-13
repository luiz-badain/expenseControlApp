const localStrategy = require('passport-local').Strategy;
const UserLogin = require('../models').UserLogin;
const bcrypt = require('bcrypt');

//Toda a configuração do passport-local com o bcrypt para autenticação de usuários
module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        UserLogin.findOne({ where: { userEmail: email } }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Está consta não existe" });
            }
            bcrypt.compare(password, user.userPassword, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Erro ao logar!" + err })
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserLogin.findOne({ where: { id: id } }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Não encontrado!" });
            } else {
                done(null, user);
            }
        });
    });
};