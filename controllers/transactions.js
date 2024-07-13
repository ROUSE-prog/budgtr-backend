const express = require('express')
const transactionsController = express.Router()
const transactionModel = require('../models/transaction.model')

// index
transactionsController.get('/', (req, res) => {
  res.status(200).send(transactionModel)
})

// show
transactionsController.get('/:id', (req, res) => {
  const id = +req.params.id
  const transaction = transactionModel.find(transaction => transaction.id === id)
  if (transaction) {
    res.status(200).send(transaction)
  } else {
      res.status(400).json({"error": `No transaction with id: ${id}`})
  }
})

// delete
transactionsController.delete('/:id', (req, res) => {
  const id = +req.params.id
  const transactionToDeleteIndex = transactionModel.findIndex(transaction => transaction.id === id)
  if (transactionToDeleteIndex > -1) {
    transactionModel.splice(transactionToDeleteIndex, 1)
    res.status(201).redirect('/transactions')
  } else {
      res.status(400).json({"error": `No transaction with id: ${id}`})
  }
})

// create
transactionsController.post('/', (req, res) => {
  const createdTransaction = req.body
  transactionModel.push({
    id: transactionModel.length+1,
    ...createdTransaction
  })
  res.status(201).json(transactionModel[transactionModel.length-1])
})

// update
transactionsController.put('/:id', (req, res) => {
  const id = +req.params.id
  const transactionToUpdateIndex = transactionModel.findIndex(transaction => transaction.id === id)

  if (transactionToUpdateIndex !== -1) {
    transactionModel[transactionToUpdateIndex] = req.body
    res.status(200).json(transactionModel[transactionToUpdateIndex])
  } else {
      res.status(404).json({"error": `No transaction with id: ${id}`})
  }
})

module.exports = transactionsController