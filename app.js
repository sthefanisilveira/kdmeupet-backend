// Chamadas dos pacotes:
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Ong = require('./src/models/Ong');

// mongoose.connect('mongodb+srv://pet-api:<pet123>@kdmeupet-api.zmhya.azure.mongodb.net/<kdmeupet-api>?retryWrites=true&w=majority', {
//     useMongoClient: true
// });

mongoose
    .connect('mongodb+srv://crisbonja:teste123@cluster0-icpwk.mongodb.net/test', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('is connected ajsjsop');
    }).catch((err) => {
        console.log(err);
    });

// Configuração da variável app para usar o bodyParser():
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Banco falso:
var DB = {
    ongs: [
        {
            id: 1,
            nome: "Abrigo animal",
            cnpj: 24516,
            responsavel: "sthefani",
            endereco: "Rua josé de paula", 
        },   
        {
            id: 2,
            nome: "Amor de 4 patas",
            cnpj: 35488,
            responsavel: "Rafael Augusto",
            endereco: "Rua das palmas", 
        } 
    ]
}

// Definição da porta para a execução da API:
const PORT = 3000;

// Criando uma instância das Rotas via Express:
const router = express.Router();

// Rota principal:
router.get('/', function(req, res) {
    res.json({ message: 'Bem vindo ao Kd Meu Pet' })
});

// Iniciando a aplicação (servidor):
app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// Definindo um padrão das rotas com o prefixo "/api":
app.use('/api', router);

// Rotas
app.get('/ongs', (req, res) => {
    res.statusCode = 200;
    res.json(DB.ongs);
});

app.get('/ong/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var ong = DB.ongs.find(g => g.id == id);

    if(ong != undefined){
        res.statusCode = 200;
        res.json(ong);
    }else{
        res.sendStatus(404);
    }
});

app.post('/ong', (req, res) => {
    var {nome, cnpj, responsavel, endereco} = req.body;

    DB.ongs.push({
        id: 4,
        nome,
        cnpj,
        responsavel,
        endereco
    });

    res.sendStatus(200);
})

app.delete('/ong/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var index = DB.ongs.findIndex(g => g.id == id);

    if(index == -1){
        res.sendStatus(404);
    }else{
        DB.ongs.splice(index,1);
        res.sendStatus(200);
    }
})

app.put('/ong/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var ong = DB.ongs.find(g => g.id == id);

    if(ong != undefined){
        var {nome, cnpj, responsavel, endereco} = req.body;

        if(nome != undefined){
            ong.nome = nome;
        }

        
        if(cnpj != undefined){
            ong.cnpj = cnpj;
        }

        if(responsavel != undefined){
            ong.responsavel = responsavel;
        }

        if(endereco != undefined){
            ong.endereco = endereco;
        }
    }else{
        res.sendStatus(404);
    }
});