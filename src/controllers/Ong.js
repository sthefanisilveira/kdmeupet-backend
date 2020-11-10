const mongoose = require('mongoose');
const Ong = mongoose.model('Ong');
const Animal = mongoose.model('Animal');

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
      try { 

        const { name, cnpj, responsible, address, animals } = await req.body;

        const ong = await Ong.create({ name, cnpj, responsible, address });
  
        await Promise.all(animals.map(async animal => {
          console.log(animal);
          const ongAnimal = new Animal({ animal, ong: ong._id });
  
          await ongAnimal.save();

          ong.animals.push(ongAnimal);
        }));
  
        await ong.save();
  
        return res.send(ong);
      } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar uma nova Ong' });
      }      
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