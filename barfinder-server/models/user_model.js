const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String },
  firebaseUserId: { type: String },
  username: { type: String },
  favouritedIngredients: { type: Array },
  favouritedDrinks: { type: Array },
  favouritedPubs: { type: Array },
})

const User = mongoose.model("Users", userSchema)

module.exports = User
