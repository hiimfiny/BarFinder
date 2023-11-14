import React, { useState } from "react"
import TabButton from "./TabButton"
import LoginPanel from "./LoginPanel"

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
      {panel}
      <LoginPanel />
    </section>
  )
}

export default Panel
