const mongoose = require("mongoose")

const Schema = mongoose.Schema

const drinkSchema = new Schema({
  name: { type: String },
  type: { type: String },
  ingredients: {type: Array},
  glass: {type: String},
  img: {type: String}
})

const Drinks = mongoose.model("Drinks", drinkSchema)

module.exports = Drinks
