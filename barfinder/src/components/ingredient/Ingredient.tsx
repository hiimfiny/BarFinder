import React, { useState } from "react"

import { IngredientType, emptyStar, fullStar } from "../Types"
import IngredientForm from "./IngredientForm"

import { Card, Button, Stack, Modal } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faPen, faTimes)

type IngredientProps = IngredientType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: IngredientType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
  adminUser: boolean
}

const Ingredient = (props: IngredientProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const onEditSubmit = (formResult: IngredientType) => {
    formResult._id = props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  return (
    <Card style={{ width: "18rem", margin: "auto" }} className="card">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <div className="d-flex justify-content-between">
          <div className="p-2">
            <Card.Text>
              {props.type + (props.abv === 0 ? " " : " (" + props.abv + "%)")}
            </Card.Text>
          </div>
          <Stack direction="horizontal" gap={1}>
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
          </Stack>
        </div>
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
