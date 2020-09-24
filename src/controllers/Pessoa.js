const mongoose = require('mongoose');
const Pessoa = mongoose.model('Pessoa');

module.exports = {
    async index(req, res) {
      const pessoa = await Pessoa.find();
      return res.json(pessoa);
    },
  
    async show(req, res) {
      const pessoa = await Pessoa.findById(req.params.id);
      return res.json(pessoa);
    },
  
    async store(req, res) {
      const pessoa = await Pessoa.create(req.body);
      return res.json(pessoa);
    },
  
    async update(req, res) {
      const pessoa = await Pessoa
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
      return res.json(pessoa);
    },
  
    async destroy(req, res) {
      await Pessoa.findByIdAndRemove(req.params.id);
      return res.send({ message: 'Pessoa removida com sucesso'});
    }
  };