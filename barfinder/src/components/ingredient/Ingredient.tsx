import React, { useState } from "react"
//import Card from "../Card"
import { IngredientType } from "../../data/IngredientsData"
import IngredientForm from "./IngredientForm"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Stack, Modal } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faPen, faTimes)

type IngredientProps = IngredientType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: IngredientType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
}

const emptyStar: string = "☆"
const fullStar: string = "★"
const Ingredient = (props: IngredientProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const onEditSubmit = (formResult: IngredientType) => {
    formResult._id=props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  return (
    <Card bg="secondary" style={{ width: "18rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Card.Text>...</Card.Text>
          </div>
          <div className="p-2 ms-auto">
            <Button
              onClick={() => {
                props.onFavouriteClick(props._id)
              }}
            >
              {props.isFavourited ? fullStar : emptyStar}
            </Button>
            <Button
              onClick={() => {
                handleShowEdit()
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button onClick={() => props.onDeleteClick(props._id)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </Stack>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IngredientForm
              onFormSubmit={onEditSubmit}
              id={props._id}
              name={props.name}
              abv={props.abv.toString()}
              type={props.type}
            ></IngredientForm>

          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  )
}
//☆✎✖
export default Ingredient
