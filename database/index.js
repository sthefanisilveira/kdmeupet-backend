const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pet-api:Apipet1@kdmeupet-api.zmhya.azure.mongodb.net/kdmeupet-api?retryWrites=true&w=majority').then(() => {
    console.log("MongoDB conectado...")
 }).catch((err) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " +err)
 });

 module.exports = mongoose;