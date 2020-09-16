// Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
    // nome cpf endereco logo
    nome: {
        type: String,
        require: true
    },
    cpf: {
        type: Number,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('pessoas', PessoaSchema);   

const Joana = mongoose.model('pessoas');

new Joana ({
    nome: "Joana Silva",
    cpf: 54874454,
    endereco: "Rua XYZ"
}).save().then(() => {
    console.log("Pessoa cadastrada com sucesso!")
}).catch((err) => {
    console.log("Houve um erro ao cadastrar a Pessoa: " +err)
});

