type OpeningTime = {
  day: string
  open: number
  close: number
}

type MenuItem = {
  name: string
  price: number
}

type FilterIngredientType = {
  name: string
  abv: number
  type: string
}

type IngredientType = FilterIngredientType & {
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

type FilterPubType = {
  name: string
  address: string
  location: number[]
  ratings: number[]
  menu: MenuItem[]
  opentime: OpeningTime[]
}

type PubType = FilterPubType & {
  _id: string
  
}

const emptyStar: string = "☆"
const fullStar: string = "★"

const ingredientTypeArray = ["Spirit", "Mixer", "Garnish"]
const drinkTypeArray = ["Classic", "Strong", "Creamy", "Fancy"]
const drinkGlassArray = ["High Ball", "Old Fashioned", "Y-glass"]
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export type {
  IngredientType,
  FilterIngredientType,
  DrinkType,
  FilterDrinkType,
  PubType,
  FilterPubType,
  OpeningTime,
  MenuItem,
}

export {
  drinkTypeArray,
  drinkGlassArray,
  ingredientTypeArray,
  emptyStar,
  fullStar,
  daysOfTheWeek
}
