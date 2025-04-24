const { Schema, model } = require('../connection');

const brokenLinkSchema = new Schema({
    url: String,
    statuscode: Number,
    referrer: String
  });
  
  module.exports = model('BrokenLink', brokenLinkSchema);
  