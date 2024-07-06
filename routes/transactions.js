const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');


router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/transactions/:id', getTransaction, (req, res) => {
  res.json(res.transaction);
});


router.post('/transactions', async (req, res) => {
  const transaction = new Transaction({
    id: req.body.id,
    item_name: req.body.item_name,
    amount: req.body.amount,
    date: req.body.date,
    from: req.body.from,
    category: req.body.category
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/transactions/:id', getTransaction, async (req, res) => {
  if (req.body.item_name != null) {
    res.transaction.item_name = req.body.item_name;
  }
  if (req.body.amount != null) {
    res.transaction.amount = req.body.amount;
  }
  if (req.body.date != null) {
    res.transaction.date = req.body.date;
  }
  if (req.body.from != null) {
    res.transaction.from = req.body.from;
  }
  if (req.body.category != null) {
    res.transaction.category = req.body.category;
  }

  try {
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/transactions/:id', getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
    res.json({ message: 'Deleted transaction' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTransaction(req, res, next) {
  let transaction;
  try {
    transaction = await Transaction.findOne({ id: req.params.id });
    if (transaction == null) {
      return res.status(404).json({ message: 'Cannot find transaction' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.transaction = transaction;
  next();
}

module.exports = router;
