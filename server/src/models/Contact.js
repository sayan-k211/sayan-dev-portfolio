const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'new' }
});

module.exports = model('Contact', ContactSchema);
