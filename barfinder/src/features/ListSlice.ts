import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
  ingredients: Ingredient[]
  glass: string
}

export const defaultDrink: Drink = {
  _id: "",
  name: "",
  type: "",
  ingredients: [],
  glass: "",
}

export type List = {
  ingredients: Ingredient[]
  drinks: Drink[]
}

const initialState: List = {
  ingredients: [],
  drinks: [],
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
  },
})

export const { setIngredients, setDrinks } = listSlice.actions
export const getIngredients = (state: RootState) => state.lists.ingredients
export const getDrinks = (state: RootState) => state.lists.drinks
/* export const getLoggedIn = (state: RootState) => state.uiState.loggedIn
export const { setLoggedIn } = UIStateSlice.actions */
export default listSlice.reducer
