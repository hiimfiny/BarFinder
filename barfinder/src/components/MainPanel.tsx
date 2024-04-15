import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import TabButton from "./TabButton"
import DrinkPanel from "./drink/DrinkPanel"
import LoginPanel from "./user/LoginPanel"
import Map from "./map/Map"
import IngredientsPanel from "./ingredient/IngredientsPanel"
import PubPanel from "./pub/PubPanel"
import { IngredientType, DrinkType, PubType } from "./Types"
import axios from "axios"
import UserPanel from "./user/UserPanel"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Menu from "./Menu"

const Panel = () => {
  const [panel, setPanel] = useState("...")
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => setShowLogin(false)
  const handleShow = () => setShowLogin(true)

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
  //TODO: remove default value
  const [userID, setUserID] = useState("65f8b0a2863e8bc6b24da173")
  const [selectedPubId, setSelectedPubId] = useState("")
  const [menuButtons, setMenuButtons] = useState([
    "Drinks",
    "Ingredients",
    "Pubs",
    "Map",
    "Login",
  ])
  const onClick = (text: string) => {
    console.log(text)
    if (text != "Login") setPanel(text)
    if (text === "Login") handleShow()
  }
  const navigate = useNavigate()
  const changeIngredients = (array: typeof defaultIngredients) => {
    setIngredientsList(array)
  }
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

  const getIdFromUserId = (user_id: string) => {
    axios
      .get(`http://localhost:5000/users/getByFirebaseId/${user_id}`)
      .then((res) => {
        setUserID(res.data)
      })
  }
  const getFavouritedLists = () => {
    console.log(userID)
    axios.get(`http://localhost:5000/users/${userID}`).then((res) => {
      console.log(res.data)
      setFavouritedIngredients(res.data.favouritedIngredients)
      setFavouritedDrinks(res.data.favouritedDrinks)
      setFavouritedPubs(res.data.favouritedPubs)
    })
  }

  const onLoginClick = (user_id: string) => {
    getIdFromUserId(user_id)
    getFavouritedLists()
    setPanel("User")
    const updatedButtons = [...menuButtons]
    updatedButtons[menuButtons.length - 1] = "User"
    setMenuButtons(updatedButtons)
    handleClose()
  }

  const onLocationPinClick = (pubId: string) => {
    console.log(pubId)
    setSelectedPubId(pubId)
    navigate("/map")
  }

  useEffect(() => {
    getFavouritedLists()
    axios
      .get("http://localhost:5000/ingredients/")
      .then((res) => {
        console.log(res.data)
        setIngredientsList(res.data)

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
      <section id="menus" className="menus">
        <Modal show={showLogin} onHide={handleClose}>
          <LoginPanel onLoginClick={onLoginClick}></LoginPanel>
        </Modal>
      </section>

      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/login" element={<div>Login</div>}></Route>
          <Route path="/register" element={<div>Regsiter</div>}></Route>
          <Route
            path="/user"
            element={<UserPanel userId={userID} onLoginClick={onLoginClick} />}
          ></Route>
          <Route
            path="/ingredients"
            element={
              <IngredientsPanel
                IngredientsList={IngredientsList}
                favouritedByUser={favouritedIngredients}
                changeIngredients={changeIngredients}
                //TODO!
                adminUser={true}
                changeFavourite={changeFavouriteList}
                user_id={userID}
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
