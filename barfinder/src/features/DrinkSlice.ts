import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Drink = {
  _id: string
  name: string
  abv: number
  type: string
}

export const defaultDrink: Drink = {
  _id: "",
  name: "",
  abv: 0,
  type: "",
}

const initialState: Drink[] = []

export const drinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {},
})

export const {} = drinkSlice.actions
export default drinkSlice.reducer
