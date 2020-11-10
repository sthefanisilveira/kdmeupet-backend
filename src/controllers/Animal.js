const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');

module.exports = {
    async index(req, res) {
      const animal = await Animal.find().populate('ong');
      return res.json(animal);
    },
  
    async show(req, res) {
      const animal = await Animal.findById(req.params.id);
      return res.json(animal);
    },
  
    async store(req, res) {
      const animal = await Animal.create({ ...req.body, ong: req.ongId }); 
      return res.json(animal);
    },
  
    async update(req, res) {
      const animal = await Animal
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
      return res.json(animal);
    },
  
    async destroy(req, res) {
      await Animal.findByIdAndRemove(req.params.id);
      return res.send({ message: 'Animal removido com sucesso'});
    }
  };