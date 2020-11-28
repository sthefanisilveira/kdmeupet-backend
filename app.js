const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('./database/index');
const requireDir = require('require-dir'); 

requireDir('./src/models');
const Animal = mongoose.model('Animal');
const Ong = mongoose.model('Ong');
const User = mongoose.model('User');
const Resource = mongoose.model('Resource');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use('/api', require('./src/routes'));


require('./src/controllers/Login')(app);

const PORT = 3000;
app.listen(PORT, function() {
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;