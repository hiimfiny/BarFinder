import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pub } from "./PubSlice"

export type Ingredient = {
  _id: string
  name: string
  abv: number
  type: string
}
export const defaultIngredient: Ingredient = {
  _id: "",
  name: "",
  abv: 0,
  type: "",
}
export type Drink = {
  _id: string
  name: string
  type: string
  ingredients: string[]
  glass: string
  img: string
}

export const defaultDrink: Drink = {
  _id: "",
  name: "",
  type: "",
  ingredients: [],
  glass: "",
  img: "",
}

export type List = {
  ingredients: Ingredient[]
  drinks: Drink[]
  pubs: Pub[]
}

const initialState: List = {
  ingredients: [],
  drinks: [],
  pubs: [],
}

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    },
    setDrinks: (state, action: PayloadAction<Drink[]>) => {
      state.drinks = action.payload
    },
    setPubs: (state, action: PayloadAction<Pub[]>) => {
      state.pubs = action.payload
    },
  },
})

export const getIngredients = (state: RootState) => state.lists.ingredients
export const getDrinks = (state: RootState) => state.lists.drinks
export const getPubs = (state: RootState) => state.lists.pubs

export const { setIngredients, setDrinks, setPubs } = listSlice.actions
export default listSlice.reducer
