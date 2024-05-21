import React, { useState, useEffect } from "react"
import DrinkPanel from "./drink/DrinkPanel"
import Map from "./map/Map"
import IngredientsPanel from "./ingredient/IngredientsPanel"
import PubPanel from "./pub/PubPanel"
import { IngredientType, DrinkType, PubType } from "./Types"
import axios from "axios"
import UserPanel from "./user/UserPanel"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Menu from "./Menu"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getLoggedIn } from "../features/UISlice"
import {
  getFavourited,
  getUserId,
  setFavourited,
  setUserId,
} from "../features/UserSlice"
import { Ingredient } from "../features/IngredientSlice"
import {
  Drink,
  setDrinks,
  setIngredients,
  setPubs,
} from "../features/ListSlice"
import { Pub, setSelectedPubId } from "../features/PubSlice"

const Panel = () => {
  const dispatch = useAppDispatch()
  //const loggedIn = useAppSelector(getLoggedIn)
  const loggedIn = true
  const userID = useAppSelector(getUserId)

  //Runs once when the user logs in
  useEffect(() => {
    console.log(loggedIn)
    if (loggedIn) {
      console.log("AAAAAAAAA")
      getFavouritedLists()
    }
  }, [loggedIn])

  const defaultIngredients: IngredientType[] = []
  const defaultDrinks: DrinkType[] = []
  const defaultPubs: PubType[] = []

  const [pubsList, setPubsList] = useState(defaultPubs)
  const [favouritedPubs, setFavouritedPubs] = useState([""])

  const [ingredientsStringList, setIngredientsStringList] = useState([""])

  const getFavouritedLists = () => {
    axios.get(`http://localhost:5000/users/${userID}`).then((res) => {
      dispatch(
        setFavourited({
          ingredients: res.data.favouritedIngredients as string[],
          drinks: res.data.favouritedDrinks as string[],
          pubs: res.data.favouritedPubs as string[],
        })
      )
      console.log(res.data.favouritedIngredients)
      setFavouritedPubs(res.data.favouritedPubs)
    })
  }

  const onLoginClick = (username: string, password: string) => {
    axios
      .post(`http://localhost:5000/users/login`, {
        email: username,
        password: password,
      })
      .then((res) => {
        dispatch(setUserId(res.data.user._id))
        console.log(res.status)
      })
    getFavouritedLists()
  }

  useEffect(() => {
    //getFavouritedLists()
    axios
      .get("http://localhost:5000/ingredients/")
      .then((res) => {
        console.log(res.data)
        dispatch(setIngredients(res.data as Ingredient[]))
        let ingredientsForDrinksArray: string[] = []
        res.data.forEach((element: { name: string }) => {
          ingredientsForDrinksArray.push(element.name)
        })
        setIngredientsStringList(ingredientsForDrinksArray)
      })
      .catch((error) => console.log(error))

    axios
      .get("http://localhost:5000/drinks/")
      .then((res) => {
        console.log(res.data)
        dispatch(setDrinks(res.data as Drink[]))
      })
      .catch((error) => console.log(error))

    axios
      .get("http://localhost:5000/pubs/")
      .then((res) => {
        console.log(res.data)
        dispatch(setPubs(res.data as Pub[]))
        setPubsList(res.data)
      })
      .catch((error) => console.log(error))
  }, [userID])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/user" element={<UserPanel />}></Route>
            <Route path="/ingredients" element={<IngredientsPanel />}></Route>
            <Route path="/drinks" element={<DrinkPanel />}></Route>
            <Route path="/pubs" element={<PubPanel />}></Route>
            <Route path="/map" element={<Map />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Panel
