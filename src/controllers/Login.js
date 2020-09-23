// // Chamadas dos pacotes:
const express = require('express');
const app = require('../../app');
const Pessoa = require('../models/Pessoa'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

router.post('/login', async (req, res) => {
    const { email } = req.body;

	try {
        if (await Pessoa.findOne({ email }))
	    return res.status(400).send({ erro: 'Usuário já existe' });

        const pessoa = await Pessoa.create(req.body);
        
        Pessoa.senha = undefined;

		return res.send({ pessoa });
	} catch (err) {
		return res.status(400).send({ erro: 'Não foi possível efetuar o login' });
	}
});

router.post('/authenticate', async (req, res) => {
    const { email, senha } = req.body;

    const pessoa = await Pessoa.findOne({ email }).select('+senha');

    if (!pessoa)
    return res.status(400).send({ erro: 'Usuário não encontrado'});
    
    if (!await bcrypt.compare(senha, pessoa.senha))
	return res.status(400).send({ erro: 'Senha inválida'});

    pessoa.senha = undefined;

    const token = jwt.sign({ id: pessoa.id }, authConfig.secret, {
        expiresIn: 86400,
    })
    

    res.send({ pessoa, token });
});

module.exports = app => app.use('/auth', router);
