const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  description: String,
  category: String,
  date: Date,
  amount: Number,
  type: { type: String, enum: ['income','expense'] },
  source: { type: String, default: 'manual' },
  rawPdfData: Object
}, { timestamps: true });
module.exports = mongoose.model('Transaction', TransactionSchema);
