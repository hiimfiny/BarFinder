import React, { useState, useEffect } from "react"
import DrinkPanel from "./drink/DrinkPanel"
import Map from "./map/Map"
import IngredientsPanel from "./ingredient/IngredientsPanel"
import PubPanel from "./pub/PubPanel"
import { IngredientType, DrinkType, PubType } from "./Types"
import axios from "axios"
import UserPanel from "./user/UserPanel"
import { Routes, Route, useNavigate } from "react-router-dom"
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
import { setIngredients } from "../features/ListSlice"

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

  const [IngredientsList, setIngredientsList] = useState(defaultIngredients)
  const [favouritedIngredients, setFavouritedIngredients] = useState([""])

  const [DrinksList, setDrinksList] = useState(defaultDrinks)
  const [favouritedDrinks, setFavouritedDrinks] = useState([""])

  const [pubsList, setPubsList] = useState(defaultPubs)
  const [favouritedPubs, setFavouritedPubs] = useState([""])

  const [ingredientsStringList, setIngredientsStringList] = useState([""])
  const [selectedPubId, setSelectedPubId] = useState("")

  const navigate = useNavigate()
  const changeDrinks = (array: typeof defaultDrinks) => {
    setDrinksList(array)
  }
  const changePubs = (array: typeof defaultPubs) => {
    setPubsList(array)
  }

  const changeFavouriteList = (list: string, array: string[]) => {
    if (list === "ingredient") setFavouritedIngredients(array)
    if (list === "drink") setFavouritedDrinks(array)
    if (list === "pub") setFavouritedPubs(array)
  }

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
      setFavouritedIngredients(res.data.favouritedIngredients)
      setFavouritedDrinks(res.data.favouritedDrinks)
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

  const onLocationPinClick = (pubId: string) => {
    setSelectedPubId(pubId)
    navigate("/map")
  }

  useEffect(() => {
    //getFavouritedLists()
    axios
      .get("http://localhost:5000/ingredients/")
      .then((res) => {
        console.log(res.data)
        setIngredientsList(res.data)
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
        setDrinksList(res.data)
      })
      .catch((error) => console.log(error))

    axios
      .get("http://localhost:5000/pubs/")
      .then((res) => {
        console.log(res.data)
        setPubsList(res.data)
      })
      .catch((error) => console.log(error))
  }, [userID])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/login" element={<div>Login</div>}></Route>
          <Route path="/register" element={<div>Regsiter</div>}></Route>
          <Route path="/user" element={<UserPanel />}></Route>
          <Route
            path="/ingredients"
            element={
              <IngredientsPanel
                //TODO!
                adminUser={true}
              />
            }
          ></Route>
          <Route
            path="/drinks"
            element={
              <DrinkPanel
                DrinksList={DrinksList}
                favouritedByUser={favouritedDrinks}
                changeDrinks={changeDrinks}
                //TODO!
                adminUser={true}
                IngredientList={ingredientsStringList}
                changeFavourite={changeFavouriteList}
                user_id={userID}
              />
            }
          ></Route>
          <Route
            path="/pubs"
            element={
              <PubPanel
                pubsList={pubsList}
                favouritedByUser={favouritedPubs}
                changePubs={changePubs}
                onLocationPinClick={onLocationPinClick}
                //TODO!
                adminUser={true}
                IngredientList={ingredientsStringList}
                changeFavourite={changeFavouriteList}
                drinksList={DrinksList}
                user_id={userID}
              />
            }
          ></Route>
          <Route
            path="/map"
            element={<Map pubsList={pubsList} selectedPubId={selectedPubId} />}
          ></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default Panel
