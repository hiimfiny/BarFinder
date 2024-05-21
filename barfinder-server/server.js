const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

mongoose.connect(uri)

const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB database connection successful")
})

const ingredientsRouter = require("./routes/ingredients")
const drinksRouter = require("./routes/drinks")
const pubsRouter = require("./routes/pubs")
const usersRouter = require("./routes/users")

app.use("/ingredients", ingredientsRouter)
app.use("/drinks", drinksRouter)
app.use("/pubs", pubsRouter)
app.use("/users", usersRouter)

app.listen(5000, () => {
  console.log("Server running on port " + port)
})
