const express = require('express');
const routes = express.Router();

// Adicionando os controllers
const Animal = require('../controllers/Animal');
const Ong = require('../controllers/Ong');
const Pessoa = require('../controllers/Pessoa');

// Rota principal
routes.get('/', function(req, res) {
    res.send("Página principal")
});

// Adicionando rotas das Ongs
routes.get('/ong', Ong.index);
routes.post('/ong', Ong.store);
routes.get('/ong/:id', Ong.show);
routes.put('/ong/:id', Ong.update);
routes.delete('/ong/:id', Ong.destroy);

// Adicionando rotas de Animais
routes.get('/animal', Animal.index);
routes.post('/animal', Animal.store);
routes.get('/animal/:id', Animal.show);
routes.put('/animal/:id', Animal.update);
routes.delete('/animal/:id', Animal.destroy);

// Adicionando rotas das Pessoas
routes.get('/pessoa', Pessoa.index);
routes.post('/pessoa', Pessoa.store);
routes.get('/pessoa/:id', Pessoa.show);
routes.put('/pessoa/:id', Pessoa.update);
routes.delete('/pessoa/:id', Pessoa.destroy);

module.exports = routes;
