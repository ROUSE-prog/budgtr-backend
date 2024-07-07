const express = require("express")
const { nanoid } = require("nanoid")
const transactionsRouter = express.Router()
const transactionArray = require("../models/transaction")

transactionsRouter.get("/", (req, res) => {
    try{
        res.status(200).send(transactionArray)
    }
    catch(error) {
        res.status(404).json({error: `Something Went Wrong!`})
    }
})

transactionsRouter.get("/:id", (req, res) => {
    const { id } = req.params
    const transaction = transactionArray.find((transaction) => transaction.id === id)
    if (transaction) {
            res.status(200).send(transaction)
    } else {
        // res.status(404).json({error: `Transaction with id ${id} does not exist.`})
        res.send("Cannot find any Transaction with this id: " + id)
    }
})

transactionsRouter.post("/", (req, res) => {
    let newDate = changeDateToHumanReadable(req.body["date"])
    const updatedCurrentTransaction = {...req.body, date: newDate}
    transactionArray.push(updatedCurrentTransaction)
    try{
        res.status(201).send(transactionArray[transactionArray.length - 1])
    }
    catch(error) {
        res.status(404).json({error: `Something Went Wrong!`})
    }
})

transactionsRouter.delete("/:id", (req, res) => {
    const { id } = req.params
    const transactionToDeleteIndex = transactionArray.findIndex((transaction) => transaction.id === id)
    if (transactionToDeleteIndex !== -1) {
        transactionArray.splice(transactionToDeleteIndex, 1)
        res.redirect("/transactions")
    } 
    else {
        res.status(404).json({error: `Transaction with id ${id} does not exist.`})
    }
})

transactionsRouter.put("/:id", (req, res) => {
    const { id } = req.params
    const transactionToUpdateIndex = transactionArray.findIndex((transaction) => transaction.id === id)
    if (transactionToUpdateIndex !== -1) {
        let newDate = changeDateToHumanReadable(req.body["date"])
        const updatedCurrentTransaction = {...req.body, date: newDate}
        transactionArray[transactionToUpdateIndex] = updatedCurrentTransaction
        res.status(200).json(transactionArray[transactionToUpdateIndex])
    } else {
        res.status(404).json({error: `Transaction with id ${id} does not exist.`})
    }
})

function changeDateToHumanReadable(str) {    
    const monthObj = {
        "01" : "Jan",
        "02" : "Feb",
        "03" : "Mar",
        "04" : "Apr",
        "05" : "May",
        "06" : "Jun",
        "07" : "Jul",
        "08" : "Aug",
        "09" : "Sep",
        "10" : "Oct",
        "11" : "Nov",
        "12" : "Dec",
    }
    let splitDate = str.split("-")
    if (str.includes(",")) {
        return str
    } else {
        return monthObj[splitDate[1]] + " " + splitDate[2] + ", " + splitDate[0]
    }
}
// Export
module.exports = transactionsRouter;
