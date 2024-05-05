import { RootState } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Favourited {
  ingredients: string[]
  drinks: string[]
  pubs: string[]
}

export interface User {
  email: string
  username: string
  user_id: string
  role: string
  favourited: Favourited
}

const initialState: User = {
  email: "",
  username: "",
  //TODO! Only for testing, remove later
  user_id: "6630b2d76c07cf7b92fb2856",
  //user_id: "",
  role: "",
  favourited: { ingredients: [], drinks: [], pubs: [] },
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    setFavourited: (state, action: PayloadAction<Favourited>) => {
      state.favourited = action.payload
    },
    setFavouritedIngredients: (state, action: PayloadAction<string[]>) => {
      state.favourited.ingredients = action.payload
    },
    setFavouritedDrinks: (state, action: PayloadAction<string[]>) => {
      state.favourited.drinks = action.payload
    },
    setFavouritedPubs: (state, action: PayloadAction<string[]>) => {
      state.favourited.pubs = action.payload
    },
  },
})
export const getUserId = (state: RootState) => state.user.user_id
export const getEmail = (state: RootState) => state.user.email
export const getUsername = (state: RootState) => state.user.username
export const getRole = (state: RootState) => state.user.role
export const getFavourited = (state: RootState) => state.user.favourited

export const {
  setEmail,
  setUsername,
  setUserId,
  setRole,
  setFavourited,
  setFavouritedIngredients,
  setFavouritedDrinks,
  setFavouritedPubs,
} = UserSlice.actions
/* export const getLoggedIn = (state: RootState) => state.uiState.loggedIn
export const { setLoggedIn } = UserSlice.actions */
export default UserSlice.reducer
