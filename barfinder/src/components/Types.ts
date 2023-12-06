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
  rating: number
  drink: string
  openNow: boolean
}

type PubType = {
  _id: string
  name: string
  address: string
  location: number[]
  ratings: number[]
  menu: MenuItem[]
  opentime: OpeningTime[]
  
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
const defaultOpeningTime: OpeningTime[] = [
  { day: "Monday", open: 0, close: 0 },
  { day: "Tuesday", open: 0, close: 0 },
  { day: "Wednesday", open: 0, close: 0 },
  { day: "Thursday", open: 0, close: 0 },
  { day: "Friday", open: 0, close: 0 },
  { day: "Saturday", open: 0, close: 0 },
  { day: "Sunday", open: 0, close: 0 },
]
const ingredientOrderTypes = ["Default", "ABC^", "ABCv"]

const formatTimeFromInt = (time:number) =>{
  const hours = String(Math.floor(time/100)).padStart(2, '0')
  const minutes = String(time % 100).padStart(2, '0')
  return `${hours}:${minutes}`
}

const formatTimeFromDate = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return hours * 100 + minutes
}

const formatDayFromDate = (date: Date) => {
  const day=date.getDay()
  return day===0 ? 6 : day-1
}

const checkIfOpen = (currentTime: number, openTime: number, closeTime: number) => {
  if(currentTime >= openTime && currentTime<= closeTime) return true
  else return false
}
const calculateAvgRating = (ratingArray: number[]) => {
  let sum = 0
  ratingArray.forEach((rating) => {
    sum += rating
  })
  return (sum / ratingArray.length)
  
}
const generateStarsArray = (rating: number) => {
  let starsArray = []
  for (let i = 0; i < 5; i++) {
    if (i <= rating) starsArray.push(fullStar)
    else starsArray.push(emptyStar)
  }
  return starsArray
}

const menuContainsDrink = (menu: MenuItem[], drink: string):boolean => {
  return menu.some((item) => item.name.toLowerCase() === drink.toLowerCase())
}

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
  daysOfTheWeek,
  defaultOpeningTime,
  ingredientOrderTypes,
  formatTimeFromInt,
  formatTimeFromDate,
  checkIfOpen,
  formatDayFromDate,
  generateStarsArray,
  calculateAvgRating,
  menuContainsDrink
}
