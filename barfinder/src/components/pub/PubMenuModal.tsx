import React, { useState } from "react"
import { Form, FloatingLabel, Button, Stack, Modal } from "react-bootstrap"
import { MenuItem, OpeningTime, PubType } from "../Types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlusCircle, faTimes, faPen } from "@fortawesome/free-solid-svg-icons"

library.add(faPlusCircle, faTimes, faPen)

type PubMenuModalProps = {
  onMenuSubmit: () => void
  menu: MenuItem[]
}
const defaultMenuItem = {name: '', price: 0}
const PubMenuModal = (props: PubMenuModalProps) => {
  const [menuItems, setMenuItems] = useState(props.menu)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(defaultMenuItem)
  const [selectedName, setSelectedName] = useState('')

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(menuItems)
    props.onMenuSubmit()
  }

  const setNameAndPrice = (field: string, data: string) =>{
    let menuItem = defaultMenuItem
    if(field === 'name') {menuItem.name=data; menuItem.price=selectedMenuItem.price}
    if(field === 'price') {menuItem.price=parseInt(data); menuItem.name=selectedMenuItem.name}
    setSelectedMenuItem(menuItem)
    console.log(menuItem)
}

  const addToMenuItems = (item: MenuItem) => {
    console.log(item)
    console.log(menuItems)
    if (!menuItems.includes(item)) setMenuItems([...menuItems, item])
  }

  const removeFromMenuItems = (item: MenuItem) => {
    if (menuItems.includes(item))
      setMenuItems(menuItems.filter((filterItem) => filterItem !== item))
  }
  return (
    <Form>
      {menuItems.map((item) => (
        <div>
          {item.name + " - " + item.price + " "}
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              removeFromMenuItems(item)
            }}
          />
          {"  -------------  "}
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
                console.log(item)
                setSelectedName(item.name)
                setSelectedMenuItem(item)
            }}
          />
        </div>
      ))}
      <Stack direction="horizontal" gap={3}>
        <FloatingLabel
          controlId="floatingNameInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setNameAndPrice('name', e.target.value)}
            defaultValue={selectedName}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPriceInput"
          label="Price"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setNameAndPrice('price', e.target.value)}
            defaultValue={selectedMenuItem.price === 0 ? "" : selectedMenuItem.price}
          />
        </FloatingLabel>
        <Button onClick={() => {
              addToMenuItems(selectedMenuItem)
            }}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            
          />
        </Button>
      </Stack>
      <Button variant="primary" onClick={onFormSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default PubMenuModal
