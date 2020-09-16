// Chamadas dos pacotes:
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Ong = require('./src/models/Ong');
const Pessoa = require('./src/models/Pessoa');
const Animal = require('./src/models/Animal');

// Carregando as rotas:
const index = require('./src/routes/index');
const ongs = require('./src/routes/ongs');

// Configuração da variável app para usar o bodyParser():
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Definição da porta para a execução da API:
const PORT = 3000;

// Iniciando a aplicação (servidor):
app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// Configurando o mongoose:
mongoose.connect('mongodb+srv://pet-api:Apipet1@kdmeupet-api.zmhya.azure.mongodb.net/kdmeupet-api?retryWrites=true&w=majority', {
    useMongoClient: true,
}).then(() => {
    console.log("MongoDB conectado...")
 }).catch((err) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " +err)
 });

app.use('/', index);
app.use('/ongs', ongs);

module.exports = app; 