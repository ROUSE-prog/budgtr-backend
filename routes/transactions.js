const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Import uuid
const Transaction = require('../models/transaction');

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create transaction route
router.post('/transactions', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body
  const transaction = new Transaction({
    id: uuidv4(), // Generate a unique id
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
    console.error('Error creating transaction:', err.message); 
  }
});

module.exports = router;
