// Chamadas dos pacotes:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PessoaSchema = new mongoose.Schema({
    // nome cpf endereco e-mail senha
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
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
});

PessoaSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.senha, 10);
	this.senha = hash;

	next();
});

const Pessoa = mongoose.model('Pessoa', PessoaSchema);

module.exports = Pessoa;   

