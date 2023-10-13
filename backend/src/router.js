const express = require('express');
const router = express.Router();

//importações
const userLogin = require('./controllers/userLoginController.js');
const expense = require('./controllers/expenseController.js');
const income = require('./controllers/incomeController.js');
const category = require('./controllers/categoryController.js');
const {authenticated} = require('./middleware/authenticated.js');

router.get('/', (req, res) => res.send('Hello world'));

// Rotas do CRUD de Usuário
router.post('/user/add', userLogin.add); // adiciona Usuário
router.post('/user/login', userLogin.login); // Login do usuário
router.get('/user/login/success', authenticated, userLogin.loginSuccess); // Rota que só pode ser acessada caso esteja logado com um usuário na sessão, você só precisa colocar o "authenticated," no meio da função da rota para funcionar
router.get('/user/login/failure', userLogin.loginFailure); // Rota de falha, ela não é necessária como a de sucesso também não é
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

// Rotas do CRUD de Rendas
router.post('/user-income/add/:id', income.add);
router.get('/user-income/:id', income.incomeByUser);
router.put('/income/:id', income.update);
router.delete('/income/:id', income.del);

// Rotas do CRUD de Categoria
router.post('/category/add', category.add); // adiciona Categoria
router.post('/category-expense/:id', category.addCategoryExpense); // Cadastrar categoria de despeza

router.get('/category/all', category.all); // Retorna todas as Categorias
router.get('/category/:id', category.categoryById); // Retorna  a Categoria pelo id
router.get('/category/name/:categoryName', category.categoryByName); // Retorna  a Categoria pelo nome
router.get('/category-expense/:id', category.categoriesByExpense); // Retorna as Categorias de uma despeza

// router.get('/category/:id', category.specific); // retorna uma Categoria baseado em seu id
router.put('/category/:id', category.update); // atualiza os dados da Categoria

router.delete('/category-expense/:id', category.deleteCategoryExpense); // deleta uma Categoria de despeza
router.delete('/category/:id', category.del); // deleta uma Categoria

// Tag e Tag de categoria
router.post('/tag/add', category.addTag); // adiciona Tag
router.post('/category-tag/:id', category.addCategoryTag); // adiciona Tag de categoria
router.get('/tag/all', category.allTags); // Retorna todas as Tags
router.get('/tag/:id', category.TagById); // Retorna  a Tag pelo id
router.get('/tag/name/:TagName', category.TagByName); // Retorna  a Tag pelo nome
router.get('/category-tag/:id', category.tagsByCategory); // busca as tags por categorias
router.put('/tag/:id', category.updateTag); // atualiza a Tag
router.delete('/tag/:id', category.deleteTag); // Deleta a Tag
router.delete('/category-tag/:id', category.deleteCategoryTag); // Deleta a Tag


module.exports = router;