// Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OngSchema = new Schema({
    // nome cpnj responsavel endereco logo
    nome: {
        type: String,
        require: true
    },
    cnpj: {
        type: Number,
        require: true
    },
    responsavel: {
        type: String,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ongs', OngSchema);   

const AbrigoAnimal = mongoose.model('ongs');

new AbrigoAnimal({
    nome: "Abrigo Animal",
    cnpj: 456445,
    responsavel: "João Silva",
    endereco: "Rua ABC"
}).save().then(() => {
    console.log("Ong cadastrada com sucesso!")
}).catch((err) => {
    console.log("Houve um erro ao cadastrar a Ong: " +err)
});