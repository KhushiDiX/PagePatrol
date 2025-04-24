const { Schema, model } = require('../connection');

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String
});

module.exports = model('Contact', contactSchema);
