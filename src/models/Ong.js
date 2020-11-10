// Chamadas dos pacotes:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OngSchema = new mongoose.Schema({
    // nome cpnj responsavel endereco logo
    name: {
        type: String,
        require: true
    },
    cnpj: {
        type: Number,
        require: true
    },
    responsible: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }       
});

OngSchema.pre('save', async function(next) {
	bcrypt.hash(this.password, 10, function(err, hash) {
        this.password = hash;

        next();
    });
});

const Ong = mongoose.model('Ong', OngSchema);

module.exports = Ong;   