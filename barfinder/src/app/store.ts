import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import UIStateReducer from "../features/UISlice"
import UserReducer from "../features/UserSlice"
import IngredientReducer from "../features/IngredientSlice"
import ListReducer from "../features/ListSlice"
import PubReducer from "../features/PubSlice"

export const store = configureStore({
  reducer: {
    uiState: UIStateReducer,
    user: UserReducer,
    lists: ListReducer,
    ingredients: IngredientReducer,
    pub: PubReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
