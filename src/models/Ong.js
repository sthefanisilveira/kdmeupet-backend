// Chamadas dos pacotes:
const mongoose = require('mongoose');

const OngSchema = new mongoose.Schema({
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

const Ong = mongoose.model('Ong', OngSchema);

module.exports = Ong;   