const express = require('express');
const bodyParser = require('body-parser');
//protocolo de comunicacão entre apis e outros serviços cors
//CORS: authoriza para qualquer tipo de serviço (front-end, outras apis, etc)
const cors = require('cors')
const router = require('./router');
const app = express();

//Rotas
app.use(bodyParser.json());

//Função CORS para a autorização do uso da API
app.use(cors())

app.use(router);

module.exports = app;