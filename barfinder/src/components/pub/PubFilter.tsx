import React, { useState } from "react"
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap"
import { DrinkType, FilterPubType } from "../Types"

type PubFilterProps = {
  onFilterSubmit: (formResults: FilterPubType) => void
  drinksList: DrinkType[]
}

const PubFilter = (props: PubFilterProps) => {
  const [filterName, setFilterName] = useState("")
  const [filterRating, setFilterRating] = useState(0)
  const [filterDrink, setFilterDrink] = useState("")
  const [filterOpenNow, setFilterOpenNow] = useState(false)

  const onFilterSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const filterResult = {
      name: filterName,
      rating: filterRating,
      drink: filterDrink,
      openNow: filterOpenNow,
    }

    props.onFilterSubmit(filterResult)
  }
  return (
    <Form onSubmit={onFilterSubmit} className="centered-panel-element">
      <Row>
        <Col lg={3}>
          <FloatingLabel
            controlId="floatingNameInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => setFilterName(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col lg={2} className="d-flex align-items-center">
          <Form.Range
            min={0}
            max={5}
            onChange={(e) => setFilterRating(parseInt(e.target.value))}
          ></Form.Range>
        </Col>
        <Col lg={2}>
          <FloatingLabel
            controlId="floatingTypeInput"
            label="Rating"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
              value={filterRating}
            />
          </FloatingLabel>
        </Col>

        <Col lg={3}>
          <FloatingLabel
            controlId="floatingTypeInput"
            label="Drink"
            className="mb-3"
          >
            <Form.Select onChange={(e) => setFilterDrink(e.target.value)}>
              <option></option>
              {props.drinksList.map((drink) => (
                <option value={drink.name}>{drink.name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col lg={2}>
          <Button type="submit">Filter</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default PubFilter
