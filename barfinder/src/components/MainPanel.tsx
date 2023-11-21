import React, { useState } from "react"
import TabButton from "./TabButton"
import LoginPanel from "./user/LoginPanel"
import DrinkPanel from "./drink/DrinkPanel"
import Card from "./Card"
import Map from "./map/Map"
import IngredientsPanel from "./ingredient/IngredientsPanel"
import PubPanel from "./pub/PubPanel"
const Panel = () => {
  const [panel, setPanel] = useState("...")
  const onClick = (text: string) => {
    console.log(text)
    setPanel(text)
  }
  const menuButtons: string[] = ["Drinks", "Ingredients", "Pubs", "Map"]

  return (
    <section id="menus">
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
      <Card backgroundColor="#6c6177">{panel}</Card>
      {panel === "Drinks" && <DrinkPanel />}
      {panel === "Ingredients" && <IngredientsPanel />}
      {panel === "Pubs" && <PubPanel />}
      {panel === "Map" && <Map />}
    </section>
  )
}

export default Panel
