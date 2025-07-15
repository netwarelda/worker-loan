const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentBalance: { type: Number, default: 0 },
  lastPayment: { type: Number, default: 0 },
  lastPaymentDate: { type: Date, default: null }
});

module.exports = mongoose.model('Worker', workerSchema);