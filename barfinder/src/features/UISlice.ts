import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UIState {
  loggedIn: boolean
  role: string
}

const initialState: UIState = {
  loggedIn: false,
  role: "",
}

export const UIStateSlice = createSlice({
  name: "UIState",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
  },
})

export const getLoggedIn = (state: RootState) => state.uiState.loggedIn
export const { setLoggedIn } = UIStateSlice.actions
export default UIStateSlice.reducer
