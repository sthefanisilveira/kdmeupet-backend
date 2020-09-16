// Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
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

module.exports = mongoose.model('animais', AnimalSchema);   

const Café = mongoose.model('animais');

new Café({
    nome: "Café",
    idade: 2,
    raca: "SRD",
    cor: "Preto",
    tipo: "Cachorro",
    deficiencia: "Não possui",
    comportamento: "Calmo",
}).save().then(() => {
    console.log("Animal cadastrado com sucesso!")
}).catch((err) => {
    console.log("Houve um erro ao cadastrar o animal: " +err)
});
