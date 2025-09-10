const mongoose = require('mongoose');

const credsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Creds', credsSchema);
