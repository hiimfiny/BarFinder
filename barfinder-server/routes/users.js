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

router.route("/friends/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.json(user.friends)
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/requests/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.json(user.requests)
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/friendsNames/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      const friendIds = user.friends
      Users.find({ _id: { $in: friendIds } })
        .then((friends) => {
          const friendEmails = friends.map((friend) => friend.email)
          res.json(friendEmails)
        })
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/requestsNames/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      const requestIds = user.requests
      Users.find({ _id: { $in: requestIds } })
        .then((friends) => {
          const requestEmails = friends.map((friend) => friend.email)
          res.json(requestEmails)
        })
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/update-friends/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.friends = req.body.friends
      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/update-requests/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.requests = req.body.requests
      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/sendRequest").post(async (req, res) => {
  const { id, email } = req.body
  try {
    // Find the user with the specified email
    const user = await Users.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if the ID is already in the user's requests array
    if (!user.requests.includes(id)) {
      // Update user's requests array with the provided ID
      user.requests.push(id)
      await user.save()

      return res.status(200).json({ message: "Request added successfully" })
    } else {
      return res.status(400).json({ message: "Request already sent" })
    }
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

router.route("/acceptRequest").post(async (req, res) => {
  const { id, email } = req.body
  try {
    // Find the user who is accepting the request
    const acceptingUser = await Users.findById(id)

    if (!acceptingUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find the user whose request is being accepted
    const sendingUser = await Users.findOne({ email })

    if (!sendingUser) {
      return res.status(404).json({ message: "Sending user not found" })
    }

    // Remove the accepting user's ID from the sending user's requests array
    sendingUser.requests = sendingUser.requests.filter(
      (requestId) => requestId.toString() !== acceptingUser._id.toString()
    )

    // Add the accepting user's ID to the sending user's friends array
    sendingUser.friends.push(acceptingUser._id)

    // Remove the sending user's ID from the accepting user's requests array
    acceptingUser.requests = acceptingUser.requests.filter(
      (requestId) => requestId.toString() !== sendingUser._id.toString()
    )

    // Add the sending user's ID to the accepting user's friends array
    acceptingUser.friends.push(sendingUser._id)

    // Save changes to both users
    await acceptingUser.save()
    await sendingUser.save()

    return res.status(200).json({ message: "Request accepted successfully" })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

router.route("/declineRequest").post(async (req, res) => {
  const { id, email } = req.body
  try {
    // Find the user who wants to decline the request
    const user = await Users.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find the user who sent the request
    const requestingUser = await Users.findOne({ email })
    console.log(requestingUser)
    if (!requestingUser) {
      return res.status(404).json({ message: "Requesting user not found" })
    }

    // Remove the requesting user's ID from the user's requests array
    user.requests = user.requests.filter(
      (requestId) => requestId.toString() !== requestingUser._id.toString()
    )

    // Save changes to the user
    await user.save()

    return res.status(200).json({ message: "Request declined successfully" })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

router.route("/deleteFriend").post(async (req, res) => {
  const { id, email } = req.body
  console.log(req.body)
  try {
    // Find the user who wants to delete the friend
    const user = await Users.findById(id)
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find the friend to delete
    const friendToDelete = await Users.findOne({ email })
    console.log(friendToDelete)

    if (!friendToDelete) {
      return res.status(404).json({ message: "Friend not found" })
    }

    // Remove the friend from the user's friends array
    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== friendToDelete._id.toString()
    )

    // Remove the user from the friend's friends array
    friendToDelete.friends = friendToDelete.friends.filter(
      (friendId) => friendId.toString() !== user._id.toString()
    )

    // Save changes to both users
    await user.save()
    await friendToDelete.save()
    console.log(user.friends)
    return res.json(user.friends)
    //return res.status(200).json(user.friends)
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
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
