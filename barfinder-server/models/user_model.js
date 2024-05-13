const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String },
  username: { type: String, default: "" },
  password: { type: String },
  role: { type: String, default: "user" },
  favouritedIngredients: { type: Array },
  favouritedDrinks: { type: Array },
  favouritedPubs: { type: Array },
  friends: { type: Array },
  requests: { type: Array },
})

const User = mongoose.model("Users", userSchema)

module.exports = User
