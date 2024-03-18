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

  const [userID, setUserID] = useState("")

  const onClick = (text: string) => {
    console.log(text)
    if (text != "Login") setPanel(text)
    if (text === "Login") handleShow()
  }
  const menuButtons: string[] = [
    "Drinks",
    "Ingredients",
    "Pubs",
    "Map",
    "Login",
  ]

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
    handleClose()
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
    <section id="menus" className="menus">
      <menu>
        {menuButtons.map((menuButton) => {
          return (
            <TabButton
              selected={panel}
              buttonName={menuButton}
              onButtonClick={() => {
                onClick(menuButton)
              }}
            >
              {menuButton}
            </TabButton>
          )
        })}
      </menu>
      <Modal show={showLogin} onHide={handleClose}>
        <LoginPanel onLoginClick={onLoginClick}></LoginPanel>
      </Modal>
      {panel === "Drinks" && (
        <DrinkPanel
          DrinksList={DrinksList}
          favouritedByUser={favouritedDrinks}
          changeDrinks={changeDrinks}
          //TODO!
          adminUser={true}
          IngredientList={ingredientsStringList}
          changeFavourite={changeFavouriteList}
        />
      )}
      {panel === "Ingredients" && (
        <IngredientsPanel
          IngredientsList={IngredientsList}
          favouritedByUser={favouritedIngredients}
          changeIngredients={changeIngredients}
          //TODO!
          adminUser={true}
          changeFavourite={changeFavouriteList}
        />
      )}
      {panel === "Pubs" && (
        <PubPanel
          pubsList={pubsList}
          favouritedByUser={favouritedPubs}
          changePubs={changePubs}
          //TODO!
          adminUser={true}
          IngredientList={ingredientsStringList}
          changeFavourite={changeFavouriteList}
          drinksList={DrinksList}
        />
      )}
      {panel === "Map" && <Map pubsList={pubsList} />}
      {panel === "User" && <UserPanel userId={userID} />}
    </section>
  )
}

export default Panel
