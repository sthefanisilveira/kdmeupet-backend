// Chamadas dos pacotes:
const mongoose = require('mongoose'); //importar do arquivo de conexão?

const ResourceSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;   
