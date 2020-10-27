// Chamadas dos pacotes:
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    // nome idade raça cor tipo deficiencia comportamento foto
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    breed: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    deficiency: {
        type: String,
        require: true
    },
    behavior: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;   
