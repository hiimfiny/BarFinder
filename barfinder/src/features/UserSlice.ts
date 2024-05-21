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
  friends: string[]
  requests: string[]
}

const initialState: User = {
  email: "",
  username: "",
  //TODO Only for testing, remove later
  user_id: "6641028b4dcbe9a88235870f",
  //user_id: "",
  role: "user",
  favourited: { ingredients: [], drinks: [], pubs: [] },
  friends: [],
  requests: [],
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
    setFriends: (state, action: PayloadAction<string[]>) => {
      state.friends = action.payload
    },
    setRequests: (state, action: PayloadAction<string[]>) => {
      state.requests = action.payload
    },
  },
})
export const getUserId = (state: RootState) => state.user.user_id
export const getEmail = (state: RootState) => state.user.email
export const getUsername = (state: RootState) => state.user.username
export const getRole = (state: RootState) => state.user.role
export const getFavourited = (state: RootState) => state.user.favourited
export const getFriends = (state: RootState) => state.user.friends
export const getRequests = (state: RootState) => state.user.requests

export const {
  setEmail,
  setUsername,
  setUserId,
  setRole,
  setFavourited,
  setFavouritedIngredients,
  setFavouritedDrinks,
  setFavouritedPubs,
  setFriends,
  setRequests,
} = UserSlice.actions

export default UserSlice.reducer
