const express = require('express')
const cors = require('cors')

// config
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// controllers
const transactionsController = require('./controllers/transactions.controller')

// health check
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// resources
app.use('/transactions', transactionsController)

module.exports = app;