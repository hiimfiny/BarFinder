const router = require("express").Router()
let Users = require("../models/user_model")

router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err))
})

router.route("/add").post((req, res) => {
  const newUser = new Users({
    favouritedIngredients: [],
  })

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user.favouritedIngredients))
    .catch((err) => res.status(400).json("Error " + err))
})

router.route("/update/:id").post((req, res) => {
  console.log(req.body.favouritedArray)
  Users.findById(req.params.id)
    .then((user) => {
      user.favouritedIngredients = req.body.favouritedArray

      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})
module.exports = router
