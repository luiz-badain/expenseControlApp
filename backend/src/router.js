const express = require('express');
const router = express.Router();

//importações
const userLogin = require('./controllers/userLoginController.js');
const expense = require('./controllers/expenseController.js');
const category = require('./controllers/categoryController.js');

router.get('/', (req, res) => res.send('Hello world'));

// Rotas do CRUD de Usuário
router.post('/user/add', userLogin.add); // adiciona Usuário
router.get('/user/all', userLogin.all); // Retorna todos os Usuários
router.get('/user/:id', userLogin.specific); // retorna um usuário baseado em seu id
router.put('/user/:id', userLogin.update); // atualiza os dados do usuário
router.delete('/user/:id', userLogin.del); // delete um usuário

// Rotas do CRUD de Despezas
router.post('/user-expense/add/:id', expense.add); // adiciona Despeza e despeza do Usuário
router.get('/user-expense/:id', expense.expenseByUser); // Retorna todas as despezas por usuário
// router.get('/user-expense/all', expense.allByUser); // retorna todas as despezas dos usuários
router.put('/expense/:id', expense.update); // atualiza os dados da despeza do usuário
router.delete('/expense/:id', expense.del); // delete uma despeza e a despeza do usuário

// Rotas do CRUD de Categoria
router.post('/category/add', category.add); // adiciona Categoria
router.post('/category-expense/:id', category.addCategoryExpense); // Cadastrar categoria de despeza

router.get('/category/all', category.all); // Retorna todos as Categorias
router.get('/category-expense/:id', category.allExpenseCategories); // Retorna todos as Categorias de uma despeza
// router.get('/category/:id', category.specific); // retorna uma Categoria baseado em seu id
// router.put('/category/:id', category.update); // atualiza os dados da Categoria
// router.delete('/category/:id', category.del); // delete uma Categoria

module.exports = router;