import React, { useState } from "react"
import TabButton from "./TabButton"
import LoginPanel from "./LoginPanel"
import Drink from "./items/Drink"
import Card from "./Card"
import Map from "./map/Map"

const Panel = () => {
  const [panel, setPanel] = useState("...")
  const onClick = (text: string) => {
    console.log(text)
    setPanel(text)
  }
  const menuButtons: string[] = ["Drinks", "Ingreedients", "Pubs", "Map"]

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
      <Card>{panel}</Card>
      
      <LoginPanel />
      <Map></Map>
    </section>
  )
}

export default Panel
