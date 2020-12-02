// // Chamadas dos pacotes:
const express = require('express');
const app = require('../../app');
const User = require('../models/User'); 
const Ong = require('../models/Ong');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 2592000,
    });
}

// Adicionando cadastro do usuário
router.post('/usuario/cadastro', async (req, res) => {
    const { email } = req.body;

	try {
        if (await User.findOne({ email }))
	    return res.status(400).send({ erro: 'Usuário já existe' });

        const user = await User.create(req.body);
        
        User.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });
        
	} catch (err) {
		return res.status(400).send({ erro: 'Não foi possível efetuar o cadastro' });
	}
});

// Adicionando login do usuário
router.post('/usuario/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
    return res.status(400).send({ erro: 'Usuário não encontrado'});
    
    if (!await bcrypt.compare(password, user.password))
	return res.status(400).send({ erro: 'Senha inválida'});

    user.password = undefined;

    res.send({ 
        user,
        token: generateToken({ id: user.id }), 
    });
});

// Adicionando cadastro da ONG
router.post('/ong/cadastro', async (req, res) => {
    const { email } = req.body;

	try {
        if (await Ong.findOne({ email }))
	    return res.status(400).send({ erro: 'Ong já existe' });

        const ong = await Ong.create(req.body);
        
        Ong.password = undefined;

		return res.send({ 
            ong,
            token: generateToken({ id: ong.id }),
        });

	} catch (err) {
		return res.status(400).send({ erro: 'Não foi possível efetuar o login' });
	}
});

// Adicionando login da ONG
router.post('/ong/login', async (req, res) => {
    const { email, password } = req.body;

    const ong = await Ong.findOne({ email }).select('+password');

    if (!ong)
    return res.status(400).send({ erro: 'Ong não encontrada'});
    
    if (!await bcrypt.compare(password, ong.password))
	return res.status(400).send({ erro: 'Senha inválida'});

    ong.password = undefined;

    res.send({ 
        ong,
        token: generateToken({ id: ong.id }), 
    });
});

// Adicionando recuperação de senha
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'silveira.sthefani1@gmail.com',
            template: 'auth/forgot_password',
            context: { token }, 
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Não foi possível enviar o e-mail de recuperação de senha' });
            
            return res.send();
        })

    } catch (err) {
        res.status(400).send({ error: 'Erro na página de esqueci a senha, tente novamente' });
    }

});

router.post('/reset_password', async (req,res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        if( token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token inválido' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expirado, gere um novo' });

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'Não foi possível resetar a senha, tente novamente' });
    }
});

module.exports = app => app.use('/auth', router);
