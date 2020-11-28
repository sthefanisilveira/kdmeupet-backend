const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

// Adicionando os controllers
const Animal = require('../controllers/Animal');
const Ong = require('../controllers/Ong');
const User = require('../controllers/User');
const Resource = require('../controllers/Resource');

// router.use(authMiddleware);

// Rota principal
router.get('/', function(req, res) {
    res.send("Página principal")
});

// Adicionando rotas das Ongs
router.get('/ong', Ong.index);
router.post('/ong', multer(multerConfig).single('file'), Ong.store);
router.get('/ong/:id', Ong.show);
router.put('/ong/:id', Ong.update);
router.delete('/ong/:id', Ong.destroy);

// Adicionando rotas de Animais
router.get('/animal', Animal.index);
router.post('/animal', authMiddleware, multer(multerConfig).single('file'), Animal.store);
router.get('/animal/:id', Animal.show);
router.put('/animal/:id', authMiddleware, Animal.update);
router.delete('/animal/:id', authMiddleware, Animal.destroy);

// Adicionando rotas de usuários
router.get('/usuario', User.index);
router.post('/usuario', multer(multerConfig).single('file'), User.store);
router.get('/usuario/:id', User.show);
router.put('/usuario/:id', User.update);
router.delete('/usuario/:id', User.destroy);

// Adicionando rotas de recursos
router.get('/recurso', Resource.index);
router.post('/recurso', Resource.store);
router.get('/recurso/:id', Resource.show);
router.put('/recurso/:id', Resource.update);
router.delete('/recurso/:id', Resource.destroy);

module.exports = router;
