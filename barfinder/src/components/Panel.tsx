import React, { useState } from "react"
import TabButton from "./TabButton"

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
    </section>
  )
}

export default Panel
