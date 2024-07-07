const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const transactionsRoutes = require("./routes/transactions")
app.use("/transactions", transactionsRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to My Bank Transaction App")
})

app.get("*", (req, res) => {
    res.status(404).json({ error: "Sorry, no page found" });
});

module.exports = app
