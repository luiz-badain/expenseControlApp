const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/auth')(passport);
// protocolo de comunicacão entre apis e outros serviços cors
// CORS: authoriza para qualquer tipo de serviço 
// (front-end, outras apis, etc)
const cors = require('cors')
const router = require('./router');
const app = express();
//Começa uma sessão 
app.use(session({
    secret: "PassportLogin",
    resave: true,
    saveUninitialized: true
}));
// Função para validar se existe um usuário logado 
// (Pode ser retirado se necessário)
app.use((req, res, next) => {
    res.locals.UserLogin = req.UserLogin || null
    next();
})
//Rotas
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//Função CORS para a autorização do uso da API
app.use(cors())
app.use(router);
module.exports = app;