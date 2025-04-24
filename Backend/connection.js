const mongoose = require('mongoose');

require('dotenv').config() // Load environment variables from .env file

const url = process.env.DB_URL;

mongoose.connect(url)
    .then((result) => {
        console.log('db connected');
    }).catch((err) => {
        console.log(err);
    });
module.exports = mongoose;