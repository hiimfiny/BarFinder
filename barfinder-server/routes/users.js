const router = require("express").Router()
const bcrypt = require("bcryptjs")
let Users = require("../models/user_model")

router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err))
})

router.route("/add").post((req, res) => {
  const { email, password } = req.body
  console.log(email + " --- " + password)
  bcrypt.hash(password, 10).then(async (hash) => {
    await Users.create({
      email,
      password: hash,
    })
      .then((user) =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      )
  })
})

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await Users.findOne({ email })
    console.log(user._id)
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({ message: "Login not succesful" })
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
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
