const router = require("express").Router()
let Pubs = require("../models/pub_model")

router.route("/").get((req, res) => {
  Pubs.find()
    .then((pubs) => res.json(pubs))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
    console.log(req.body)
    const _id = req.body._id
  const name = req.body.name
  const address = req.body.address
  const location = req.body.location
  const ratings = req.body.ratings
  const menu = req.body.menu
  const opentime = req.body.opentime

  const newPub = new Pubs({
    _id,
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

router.route("/:id").delete((req,res) => {
    Pubs.findByIdAndDelete(req.params.id)
    .then(() => res.json('Pub deleted'))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update-rating/:id").post((req,res) => {
    Pubs.findById(req.params.id)
    .then(pub => {
        pub.ratings = req.body

        pub.save()
        .then(() => res.json('Ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router
