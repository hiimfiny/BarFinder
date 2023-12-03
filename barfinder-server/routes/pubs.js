const router = require("express").Router()
let Pubs = require("../models/pub_model")

router.route("/").get((req, res) => {
  Pubs.find()
    .then((pubs) => res.json(pubs))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
    console.log(req.body)
  const name = req.body.name
  const address = req.body.address
  const location = req.body.location
  const ratings = req.body.ratings
  const menu = req.body.menu
  const opentime = req.body.opentime

  const newPub = new Pubs({
    name,
    address,
    location,
    ratings,
    menu,
    opentime,
  })

  newPub
    .save()
    .then(() => res.json("Pub added"))
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
