import React, { useState } from "react"
import {
  Form,
  FloatingLabel,
  Button,
  Stack,
  Modal,
  Table,
} from "react-bootstrap"
import { MenuItem, OpeningTime, PubType } from "../Types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlusCircle, faTimes, faPen } from "@fortawesome/free-solid-svg-icons"
import { parse } from "path"

library.add(faPlusCircle, faTimes, faPen)

type PubMenuModalProps = {
  onMenuSubmit: (menuItems: MenuItem[]) => void
  menu: MenuItem[]
}
const defaultMenuItem = { name: "", price: 0 }
const PubMenuModal = (props: PubMenuModalProps) => {
  const [menuItems, setMenuItems] = useState(props.menu)
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<MenuItem>(defaultMenuItem)
  const [selectedName, setSelectedName] = useState("")

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(menuItems)
    props.onMenuSubmit(menuItems)
  }

  const setNameAndPrice = (field: string, value: string) => {
    let typedValue: number | string = value
    if (field === "price") typedValue = parseInt(value)
    setSelectedMenuItem((prev) => ({ ...prev, [field]: typedValue }))
  }
  

  const addToMenuItems = () => {
    if (selectedMenuItem.name && selectedMenuItem.price !== 0) {
      // Check if the item already exists in menuItems
      const itemExists = menuItems.some(
        (item) =>
          item.name === selectedMenuItem.name &&
          item.price === selectedMenuItem.price
      )

      if (!itemExists) {
        setMenuItems((prevItems) => [...prevItems, { ...selectedMenuItem }])
        setSelectedMenuItem(defaultMenuItem) // Reset selectedMenuItem to initial state
      } else {
        alert("This item already exists in the menu.")
      }
    }
  }

  const removeFromMenuItems = (item: MenuItem) => {
    if (menuItems.includes(item))
      setMenuItems(menuItems.filter((filterItem) => filterItem !== item))
  }
  return (
    <Form>
      <div>Current items:</div>
      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedMenuItem(item)
                      removeFromMenuItems(item)
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button
                    onClick={() => {
                      removeFromMenuItems(item)
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Stack direction="horizontal" gap={3}>
        <FloatingLabel
          controlId="floatingNameInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setNameAndPrice("name", e.target.value)}
            value={selectedMenuItem.name}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPriceInput"
          label="Price"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setNameAndPrice("price", e.target.value)}
            value={selectedMenuItem.price === 0 ? "" : selectedMenuItem.price}
          />
        </FloatingLabel>
        <Button
          onClick={() => {
            addToMenuItems()
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </Stack>
      <Button variant="primary" onClick={onFormSubmit}>
        Save Menu
      </Button>
    </Form>
  )
}

export default PubMenuModal
