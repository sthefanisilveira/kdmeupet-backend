const express = require('express');
const router = express.Router();

// Adicionando os controllers
const Animal = require('../controllers/Animal');
const Ong = require('../controllers/Ong');
const Pessoa = require('../controllers/Pessoa');

// Rota principal
router.get('/', function(req, res) {
    res.send("Página principal")
});

// Adicionando rotas das Ongs
router.get('/ong', Ong.index);
router.post('/ong', Ong.store);
router.get('/ong/:id', Ong.show);
router.put('/ong/:id', Ong.update);
router.delete('/ong/:id', Ong.destroy);

// Adicionando rotas de Animais
router.get('/animal', Animal.index);
router.post('/animal', Animal.store);
router.get('/animal/:id', Animal.show);
router.put('/animal/:id', Animal.update);
router.delete('/animal/:id', Animal.destroy);

// Adicionando rotas das Pessoas
router.get('/pessoa', Pessoa.index);
router.post('/pessoa', Pessoa.store);
router.get('/pessoa/:id', Pessoa.show);
router.put('/pessoa/:id', Pessoa.update);
router.delete('/pessoa/:id', Pessoa.destroy);

module.exports = router;
