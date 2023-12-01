const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  name: { type: String },
  abv: { type: Number },
  type: { type: String },
})

const Ingredients = mongoose.model("Ingredients", ingredientSchema)

module.exports = Ingredients
