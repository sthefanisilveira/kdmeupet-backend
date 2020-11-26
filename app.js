// Chamadas dos pacotes:
const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('./database/index');
const requireDir = require('require-dir'); 

// Carregando os models
requireDir('./src/models');
const Animal = mongoose.model('Animal');
const Ong = mongoose.model('Ong');
const User = mongoose.model('User');

// Configuração da variável app para usar o bodyParser():
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Carregando as rotas
app.use('/api', require('./src/routes'));

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.options('*', cors());
require('./src/controllers/Login')(app);

// Definição da porta para a execução da API:
const PORT = 3000;

app.use(cors());

// Iniciando a aplicação (servidor):
app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

module.exports = app; 