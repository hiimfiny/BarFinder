import React, { useState } from "react"
import { Form, FloatingLabel, Button, Stack, Modal } from "react-bootstrap"
import { MenuItem, OpeningTime, PubType } from "../Types"
import PubMenuModal from "./PubMenuModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faPlusCircle, faTimes)

type PubFormProps = {
  onFormSubmit: (formResult: PubType) => void
  id: string
  name: string
  address: string
  location: number[]
  menu: MenuItem[]
  opentime: OpeningTime[]
}
const PubForm = (props: PubFormProps) => {
  const [formName, setFormName] = useState(props.name)
  const [formAddress, setFormAddress] = useState(props.address)
  const [formLocation, setformLocation] = useState(props.location)
  const [formMenu, setFormMenu] = useState(props.menu)
  const [formOpenTime, setFormOpenTime] = useState(props.opentime)

  const [showMenu, setShowMenu] = useState(false)
  const [showOpenHours, setShowOpenHours] = useState(false)

  const handleCloseMenu = () => setShowMenu(false)
  const handleShowMenu = () => setShowMenu(true)
  const handleCloseOpenHours = () => setShowOpenHours(false)
  const handleShowOpenHours = () => setShowOpenHours(true)

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formResult = {
      _id: "",
      name: formName,
      address: formAddress,
      location: formLocation,
      ratings: [],
      menu: formMenu,
      opentime: formOpenTime,
    }
    props.onFormSubmit(formResult)
  }
  const changeFormLocation = (field: string, coord: number) => {
    let location = formLocation
    if (field === "lat") location[0] = coord
    if (field === "lng") location[1] = coord
  }
  return (
    <Form onSubmit={onFormSubmit}>
      {/* Name, address */}
      <div>
        <FloatingLabel
          controlId="floatingNameInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setFormName(e.target.value)}
            defaultValue={formName}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingAddressInput"
          label="Address"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setFormAddress(e.target.value)}
            defaultValue={formAddress}
          />
        </FloatingLabel>
      </div>
      {/* Location coords */}
      <div>
        <Stack direction="horizontal" gap={3}>
          <FloatingLabel
            controlId="floatingLatInput"
            label="Latitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => changeFormLocation('lat',parseInt(e.target.value))}
              defaultValue={formLocation[0]}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingLongInput"
            label="Longitude"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => changeFormLocation('lng',parseInt(e.target.value))}
              defaultValue={formLocation[1]}
            />
          </FloatingLabel>
        </Stack>
      </div>

      {/* Menu, opentime modal buttons */}
      <div>
        <Stack direction="horizontal" gap={3}>
          <Button onClick={handleShowMenu}>Edit menu</Button>
          <Modal show={showMenu} onHide={handleCloseMenu}>
            <Modal.Header closeButton>
              <Modal.Title>...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PubMenuModal
                menu={formMenu}
                onMenuSubmit={() => {
                  console.log("Menu submitted")
                  handleCloseMenu()
                }}
              ></PubMenuModal>
            </Modal.Body>
          </Modal>

          <Button onClick={handleShowOpenHours}>Edit open hours</Button>
          <Modal show={showOpenHours} onHide={handleCloseOpenHours}>
            <Modal.Header closeButton>
              <Modal.Title>...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>...</p>
            </Modal.Body>
          </Modal>
        </Stack>
      </div>
      <hr />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default PubForm
