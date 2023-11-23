import React from "react"
//import Card from "../Card"
import { IngredientType } from "../../data/IngredientsData"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Col, Stack } from "react-bootstrap"
type IngredientProps = IngredientType & {
  onFavouriteClick: (name: string) => void
  isFavourited: boolean
}
const emptyStar: string = "☆"
const fullStar: string = "★"
const Ingredient = (props: IngredientProps) => {
  return (
    <Col className="d-flex">
      <Card bg="secondary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Card.Text>...</Card.Text>
            </div>
            <div className="p-2 ms-auto">
              <Button
                
                onClick={() => {
                  props.onFavouriteClick(props.id)
                }}
              >
                {props.isFavourited ? emptyStar : fullStar}
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Ingredient
