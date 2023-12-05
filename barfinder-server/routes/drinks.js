const router = require("express").Router()
let Drinks = require("../models/drink_model")

router.route("/").get((req, res) => {
  Drinks.find()
    .then((drinks) => res.json(drinks))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
  const _id = req.body._id
  const name = req.body.name
  const type = req.body.type
  const ingredients = req.body.ingredients
  const glass = req.body.glass
  const img = req.body.img

  const newDrink = new Drinks({
    _id,
    name,
    type,
    ingredients,
    glass,
    img
  })

  newDrink
    .save()
    .then(() => res.json("Drink added"))
    .catch((err) => res.status(400).json("Error: " + err))
})
router.route("/:id").delete((req,res) => {
    Drinks.findByIdAndDelete(req.params.id)
    .then(() => res.json('Drink deleted'))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update/:id").post((req,res) => {
    Drinks.findById(req.params.id)
    .then(drink => {
        drink._id = req.body._id
        drink.name = req.body.name
        drink.type = req.body.type
        drink.ingredients= req.body.ingredients
        drink.glass=req.body.glass
        drink.img=req.body.img

        drink.save()
        .then(() => res.json('Drink updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router
