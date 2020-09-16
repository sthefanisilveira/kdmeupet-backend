const mongoose = require('mongoose');
const Ong = mongoose.model('ongs');

module.exports = {
    async index(req, res) {
      const ong = await Ong.find();
      return res.json(ong);
    },
  
    async show(req, res) {
      const ong = await Ong.findById(req.params.id);
      return res.json(ong);
    },
  
    async store(req, res) {
      const ong = await Ong.create(req.body);
      return res.json(ong);
    },
  
    async update(req, res) {
      const ong = await Ong
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
      return res.json(ong);
    },
  
    async destroy(req, res) {
      await Ong.findByIdAndRemove(req.params.id);
      return res.send({ message: 'Ong removida com sucesso'});
    }
  };