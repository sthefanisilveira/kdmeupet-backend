const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');

module.exports = {
    async index(req, res) {
      const resource = await Resource.find();
      return res.json(resource);
    },
  
    async show(req, res) {
      const resource = await Resource.findById(req.params.id);
      return res.json(resource);
    },
  
    async store(req, res) {
      const resource = await Resource.create(req.body);
      return res.json(resource);
    },
  
    async update(req, res) {
      const resource = await Resource
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
      return res.json(resource);
    },
  
    async destroy(req, res) {
      await Resource.findByIdAndRemove(req.params.id);
      return res.send({ message: 'Recurso removido com sucesso'});
    }
  };