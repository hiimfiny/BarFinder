import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Ingredient } from "./IngredientSlice"

export type List = {
  ingredients: Ingredient[]
}

const initialState: List = {
  ingredients: [],
}

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    },
  },
})

export const { setIngredients } = listSlice.actions
export const getIngredients = (state: RootState) => state.lists.ingredients
/* export const getLoggedIn = (state: RootState) => state.uiState.loggedIn
export const { setLoggedIn } = UIStateSlice.actions */
export default listSlice.reducer
