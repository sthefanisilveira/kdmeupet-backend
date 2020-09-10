// Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OngSchema = new Schema({
    // nome cpnj responsavel endereco logo
    nome: String,
    cpnj: Number,
    responsavel: String,
    endereco: String,
});

module.exports = mongoose.model('Ong', OngSchema);   