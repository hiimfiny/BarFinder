type OpeningTime = {
  day: string
  open: number
  close: number
}

type MenuItem = {
  name: string
  price: number
}

type filterIngredientType = {
  name: string
  abv: number
  type: string
}

type IngredientType = filterIngredientType & {
  _id: string
}

type FilterDrinkType = {
  name: string
  type: string
  ingredients: string[]
  glass: string
}
type DrinkType = FilterDrinkType & {
  _id: string
  img: string
}
const emptyStar: string = "☆"
const fullStar: string = "★"

const ingredientTypeArray = ["Spirit", "Mixer", "Garnish"]
const drinkTypeArray = ["Classic", "Strong", "Creamy", "Fancy"]
const drinkGlassArray = ["High Ball", "Old Fashioned", "Y-glass"]

export type {
  OpeningTime,
  MenuItem,
  IngredientType,
  filterIngredientType,
  DrinkType,
  FilterDrinkType,
}

export {
  drinkTypeArray,
  drinkGlassArray,
  ingredientTypeArray,
  emptyStar,
  fullStar,
}
