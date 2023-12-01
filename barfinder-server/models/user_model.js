const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  favouritedIngredients: { type: Array },
})

const User = mongoose.model("Users", userSchema)

module.exports = User