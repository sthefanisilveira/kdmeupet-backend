const mongoose = require('mongoose');

mongoose.connect('mongodb://cris:teste123@ds139934.mlab.com:39934/pets-api').then(() => {
    console.log("MongoDB conectado...")
 }).catch((err) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " +err)
 });

 module.exports = mongoose;