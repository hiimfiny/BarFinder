const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pubSchema = new Schema({
  name: { type: String },
  address: { type: String },
  location: {type: Array},
  ratings: {type: Array},
  menu: {type: Array},
  opentime: {type: Array}
})

const Pubs = mongoose.model("Pubs", pubSchema)

module.exports = Pubs