import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
export type OpeningTime = {
  day: string
  open: number
  close: number
}
const defaultOpeningTime: OpeningTime[] = [
  { day: "Monday", open: 0, close: 0 },
  { day: "Tuesday", open: 0, close: 0 },
  { day: "Wednesday", open: 0, close: 0 },
  { day: "Thursday", open: 0, close: 0 },
  { day: "Friday", open: 0, close: 0 },
  { day: "Saturday", open: 0, close: 0 },
  { day: "Sunday", open: 0, close: 0 },
]

export type MenuItem = {
  name: string
  price: number
}
export type Pub = {
  _id: string
  name: string
  address: string
  location: number[]
  ratings: number[]
  menu: MenuItem[]
  opentime: OpeningTime[]
}

const initialState = {
  selectedPubId: "",
}
export const pubSlice = createSlice({
  name: "pub",
  initialState,
  reducers: {
    setSelectedPubId: (state, action: PayloadAction<string>) => {
      state.selectedPubId = action.payload
    },
  },
})

export const getSelectedPubId = (state: RootState) => state.pub.selectedPubId
export const { setSelectedPubId } = pubSlice.actions
export default pubSlice.reducer
