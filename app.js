// Chamadas dos pacotes:
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./database/index');
const requireDir = require('require-dir'); 

// Configurando o mongoose:
// mongoose.connect('mongodb+srv://pet-api:Apipet1@kdmeupet-api.zmhya.azure.mongodb.net/kdmeupet-api?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
    
// }).then(() => {
//     console.log("MongoDB conectado...")
//  }).catch((err) => {
//     console.log("Houve um erro ao se conectar ao MongoDB: " +err)
//  });

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

require('./src/controllers/Login')(app);

// Definição da porta para a execução da API:
const PORT = 3000;

// Iniciando a aplicação (servidor):
app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

module.exports = app; 