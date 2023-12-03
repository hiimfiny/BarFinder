const router = require("express").Router()
let Ingredients = require("../models/ingredient_model")

router.route("/").get((req, res) => {
  Ingredients.find()
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
  const id = req.body.id
  const name = req.body.name
  const abv = req.body.abv
  const type = req.body.type

  const newIngredient = new Ingredients({
    id,
    name,
    abv,
    type,
  })

  newIngredient
    .save()
    .then(() => res.json("Ingredient added"))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/:id").delete((req,res) => {
    Ingredients.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient deleted'))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update/:id").post((req,res) => {
    Ingredients.findById(req.params.id)
    .then(ingredient => {
        ingredient._id = req.body._id
        ingredient.name = req.body.name
        ingredient.abv = req.body.abv

        ingredient.save()
        .then(() => res.json('Ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router
