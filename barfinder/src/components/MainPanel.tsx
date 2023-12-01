import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import TabButton from "./TabButton"
import DrinkPanel from "./drink/DrinkPanel"
import LoginPanel from "./user/LoginPanel"
import Map from "./map/Map"
import IngredientsPanel from "./ingredient/IngredientsPanel"
import PubPanel from "./pub/PubPanel"

const Panel = () => {
  const [panel, setPanel] = useState("...")
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => setShowLogin(false)
  const handleShow = () => setShowLogin(true)

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

  return (
    <section id="menus" className="menus">
      <menu>
        {menuButtons.map((menuButton) => {
          return (
            <TabButton
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
        <LoginPanel></LoginPanel>
      </Modal>
      {panel === "Drinks" && <DrinkPanel />}
      {panel === "Ingredients" && <IngredientsPanel />}
      {panel === "Pubs" && <PubPanel />}
      {panel === "Map" && <Map />}
    </section>
  )
}

export default Panel
