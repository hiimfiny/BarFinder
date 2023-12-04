import React, { useState } from "react"

import { Card, Button, Stack, Modal, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"

import { PubType, FilterPubType, emptyStar, fullStar } from "../Types"
import { checkOpened } from "../Functions"
import PubForm from "./PubForm"
library.add(faPen, faTimes)

type PubProps = PubType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: PubType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
  adminUser: boolean
  ingredientsList: string[]
}

const Pub = (props: PubProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  let sum = 0
  props.ratings.forEach(rating => {sum+= rating})
  const avgRating = (sum/props.ratings.length).toFixed(1)
  const onEditSubmit = (formResult: PubType) => {
    formResult._id = props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  
  return (
    <Card bg="secondary" style={{ width: "20rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Stack direction="horizontal" gap={3}>
          <div>{avgRating+"/5"}</div>
          <div className="p-2 ms-auto">
            <Button
              onClick={() => {
                props.onFavouriteClick(props._id)
              }}
            >
              {props.isFavourited ? fullStar : emptyStar}
            </Button>
            {props.adminUser && (
              <Button
                onClick={() => {
                  handleShowEdit()
                  const currentDate = new Date()
                  checkOpened((currentDate.getHours()*100+currentDate.getMinutes()),currentDate.getDay(),props.opentime)
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            )}
            {props.adminUser && (
              <Button onClick={() => props.onDeleteClick(props._id)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            )}
          </div>
        </Stack>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>PubForm</p>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default Pub