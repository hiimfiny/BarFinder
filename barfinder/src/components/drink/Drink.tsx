import React, { useState } from "react"

import { DrinkType, FilterDrinkType, emptyStar, fullStar } from "../Types"
import { Card, Button, Stack, Modal, Image } from "react-bootstrap"

import DrinkForm from "./DrinkForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faPen, faTimes)
//☆✎✖

type DrinkProps = DrinkType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: DrinkType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
  adminUser: boolean
  ingredientsList: string[]
}

const Drink = (props: DrinkProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const onEditSubmit = (formResult: DrinkType) => {
    formResult._id = props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  return (
    <Card style={{ width: "20rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <div className="d-flex justify-content-between">
          <div className="p-2">
            <Image
              src={
                props.img === ""
                  ? "https://static.specsonline.com/wp-content/themes/cheers/assets/images/default_bar-mixers.png"
                  : props.img
              }
              style={{ width: "60px", height: "60px" }}
            />
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
        <p>{props.ingredients.join(", ")}</p>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DrinkForm
              key={props._id}
              id={props._id}
              name={props.name}
              type={props.type}
              glass={props.glass}
              img={props.img}
              ingredients={props.ingredients}
              onFormSubmit={onEditSubmit}
              ingredientList={props.ingredientsList}
            ></DrinkForm>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default Drink
