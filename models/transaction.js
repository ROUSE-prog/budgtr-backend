
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  item_name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  from: { type: String, required: true },
  category: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
