const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Adicionando os controllers
const Animal = require('../controllers/Animal');
const Ong = require('../controllers/Ong');
const User = require('../controllers/User');

router.use(authMiddleware);

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

// Adicionando rotas de usuários
router.get('/usuario', User.index);
router.post('/usuario', User.store);
router.get('/usuario/:id', User.show);
router.put('/usuario/:id', User.update);
router.delete('/usuario/:id', User.destroy);

module.exports = router;
