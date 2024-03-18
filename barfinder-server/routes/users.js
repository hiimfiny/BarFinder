const router = require("express").Router()
let Users = require("../models/user_model")

router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err))
})

router.route("/add").post((req, res) => {
  console.log("in users/add")
  const newUser = new Users({
    email: req.body.email,
    firebaseUserId: req.body.firebase_user_id,
    username: "",
    favouritedIngredients: [],
    favouritedDrinks: [],
    favouritedPubs: [],
  })

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").get((req, res) => {
  console.log("in server /:id")
  console.log(req.params.id)
  Users.findById(req.params.id)
    .then((user) => {
      console.log(user)
      res.json({
        favouritedIngredients: user.favouritedIngredients,
        favouritedDrinks: user.favouritedDrinks,
        favouritedPubs: user.favouritedPubs,
      })
    })
    .catch((err) => res.status(400).json("Error " + err))
})
router.route("/getByFirebaseId/:id").get((req, res) => {
  Users.findOne({ firebaseUserId: req.params.id })
    .then((user) => res.json(user._id))
    .catch((err) => res.status(400).json("Error " + err))
})

router.route("/update-ingredients/:id").post((req, res) => {
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
router.route("/update-drinks/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.favouritedDrinks = req.body.favouritedArray

      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/update-pubs/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.favouritedPubs = req.body.favouritedArray

      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
