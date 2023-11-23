import React, { useState, SyntheticEvent } from "react"
import {
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  FloatingLabel,
} from "react-bootstrap"
import { filterIngredientType } from "../../data/IngredientsData"

type ingredientFilterProps = {
  onFilterSubmit: (formResults: filterIngredientType) => void
}

const IngredientFilter = (props: ingredientFilterProps) => {
  const [filterName, setfilterName] = useState("")
  const [filterAbv, setfilterAbv] = useState("")
  const [filterType, setfilterType] = useState("")

  const onFilterSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const filterResult = {
        name: filterName,
        abv: filterAbv === '' ? 0 : parseInt(filterAbv,10),
        type: filterType
    }
    props.onFilterSubmit(filterResult)
  }

  return (
    <Form onSubmit={onFilterSubmit}>
      <Row className="align-items-center">
        <Col sm={3} className="my-1">
          <FloatingLabel
            controlId="floatingNameInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setfilterName(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col sm={3} className="my-1">
          <FloatingLabel
            controlId="floatingAbvInput"
            label="Abv (%)"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setfilterAbv(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col sm={3} className="my-1">
          <FloatingLabel
            controlId="floatingTypeInput"
            label="Type"
            className="mb-3"
          >
            <Form.Select onChange={(e) => setfilterType(e.target.value)}>
              <option>Select type</option>
              <option value="spirit">Spirit</option>
              <option value="beer">Beer</option>
              <option value="wine">Wine</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col xs="auto" className="my-1">
          <Button type="submit">Filter</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default IngredientFilter
