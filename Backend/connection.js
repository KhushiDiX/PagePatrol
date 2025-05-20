const mongoose = require('mongoose');

require('dotenv').config() // Load environment variables from .env file

const url = process.env.DB_URL || 'https://pagepatrol.onrender.com';

mongoose.connect(url)
    .then((result) => {
        console.log('DB Connected');
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;