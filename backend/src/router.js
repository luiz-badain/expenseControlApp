const express = require('express');
const router = express.Router();

//importações
const userLogin = require('./controllers/userLoginController.js');
const expense = require('./controllers/expenseController.js');

router.get('/', (req, res) => res.send('Hello world'));

// Rotas do CRUD de Usuário
router.post('/user/add', userLogin.add); // adiciona Usuário
router.get('/user/all', userLogin.all); // Retorna todos os Usuários
router.get('/user/:id', userLogin.specific); // retorna um usuário baseado em seu id
router.put('/user/:id', userLogin.update); // atualiza os dados do usuário
router.delete('/user/:id', userLogin.del); // delete um usuário

// Rotas do CRUD de Despezas
router.post('/user-expense/add/:id', expense.add); // adiciona Despeza e despeza do Usuário
router.get('/user-expense/all/:id', expense.allByUser); // Retorna todas as despezas do usuário
// router.get('/expense/:id', expense.specific); // retorna um usuário baseado em seu id
router.put('/expense/:id', expense.update); // atualiza os dados do usuário
router.delete('/expense/:id', expense.del); // delete um usuário



module.exports = router;