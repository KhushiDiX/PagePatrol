const { Schema, model } = require('../connection');

const feedbackSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Feedback', feedbackSchema);