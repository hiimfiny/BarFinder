import React, { useState } from "react"

import { Card, Button, Stack, Modal, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"

import { PubType, FilterPubType, emptyStar, fullStar } from "../Types"
import { checkOpened } from "../Functions"
import PubForm from "./PubForm"
import PubRatingModal from "./PubRatingModal"
library.add(faPen, faTimes)

type PubProps = PubType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: PubType) => void
  onDeleteClick: (id: string) => void
  onRateClick: (ratings: number[], id: string) => void
  isFavourited: boolean
  adminUser: boolean
  ingredientsList: string[]
}

const Pub = (props: PubProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [ratingArray, setRatingArray] = useState(props.ratings)

  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const handleCloseRating = () => setShowRating(false)
  const handleShowRating = () => setShowRating(true)

  const calculateAvgRating = () => {
    let sum = 0
    ratingArray.forEach((rating) => {
      sum += rating
    })
    return sum
  }

  const avgRating = (calculateAvgRating() / ratingArray.length).toFixed(1)
  const onEditSubmit = (formResult: PubType) => {
    formResult._id = props._id
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  const onRateClick = (rating: number) => {
    handleCloseRating()
    setRatingArray([...ratingArray, rating])
    calculateAvgRating()
    props.onRateClick([...ratingArray, rating], props._id)
  }
  return (
    <Card style={{ width: "30rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <div className="d-flex justify-content-between">
          <div>
            {ratingArray.length === 0 ? "No rating yet" : avgRating + "/5"}
          </div>
          <Stack direction="horizontal" gap={1}>
            <Button
              onClick={() => {
                props.onFavouriteClick(props._id)
              }}
            >
              {props.isFavourited ? fullStar : emptyStar}
            </Button>
            <Button
              onClick={() => {
                handleShowRating()
              }}
            >
              Rate
            </Button>
            {props.adminUser && (
              <Button
                onClick={() => {
                  handleShowEdit()
                  const currentDate = new Date()
                  checkOpened(
                    currentDate.getHours() * 100 + currentDate.getMinutes(),
                    currentDate.getDay(),
                    props.opentime
                  )
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
            <PubForm
              onFormSubmit={onEditSubmit}
              id={props._id}
              name={props.name}
              address={props.address}
              location={props.location}
              menu={props.menu}
              opentime={props.opentime}
            ></PubForm>
          </Modal.Body>
        </Modal>
        <Modal show={showRating} onHide={handleCloseRating}>
          <Modal.Header closeButton>
            <Modal.Title>Give a rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PubRatingModal onRateClick={onRateClick}></PubRatingModal>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default Pub
