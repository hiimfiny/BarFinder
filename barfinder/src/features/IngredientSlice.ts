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

const initialState: Ingredient[] = []

export const IngredientSlice = createSlice({
  name: "ingredientState",
  initialState,
  reducers: {},
})

export const {} = IngredientSlice.actions
/* export const getLoggedIn = (state: RootState) => state.uiState.loggedIn
export const { setLoggedIn } = UIStateSlice.actions */
export default IngredientSlice.reducer
