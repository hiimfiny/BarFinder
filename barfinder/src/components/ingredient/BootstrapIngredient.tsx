import React from "react"
import { IngredientType } from "../../data/IngredientsData"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Col, ListGroup } from "react-bootstrap"
type IngredientProps = IngredientType & {
  onFavouriteClick: (name: string) => void
  isFavourited: boolean
}
const emptyStar: string = "☆"
const fullStar: string = "★"
const BootstrapIngredient = (props: IngredientProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default BootstrapIngredient
