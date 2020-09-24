// Chamadas dos pacotes:
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    // nome idade raça cor tipo deficiencia comportamento foto
    nome: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    raca: {
        type: String,
        require: true
    },
    cor: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    deficiencia: {
        type: String,
        require: true
    },
    comportamento: {
        type: String,
        require: true
    },
});

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;   
