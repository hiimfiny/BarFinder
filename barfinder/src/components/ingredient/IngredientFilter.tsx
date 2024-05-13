import React, { useState, SyntheticEvent } from "react"
import { Form, Stack, Button, FloatingLabel } from "react-bootstrap"
import {
  FilterIngredientType,
  ingredientTypeArray,
  ingredientOrderTypes,
} from "../Types"
import { defaultIngredient, Ingredient } from "../../features/IngredientSlice"

type ingredientFilterProps = {
  onFilterSubmit: (formResults: Ingredient) => void
  onOrderSubmit: (order: string) => void
  onClearFilter: () => void
}

const IngredientFilter = (props: ingredientFilterProps) => {
  const [filterName, setfilterName] = useState("")
  const [filterAbv, setfilterAbv] = useState("")
  const [filterType, setfilterType] = useState("")

  const onFilterSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const filterResult = {
      _id: "",
      name: filterName,
      abv: filterAbv === "" ? 0 : parseInt(filterAbv, 10),
      type: filterType,
    }

    props.onFilterSubmit(filterResult)
  }

  const clearFilter = () => {
    props.onClearFilter()
  }

  return (
    <Form onSubmit={onFilterSubmit} className="centered-panel-element">
      <Stack
        direction="horizontal"
        gap={3}
        className="d-flex justify-content-center"
      >
        <Button
          onClick={() => {
            clearFilter()
          }}
        >
          Clear
        </Button>
        <FloatingLabel
          controlId="floatingOrderInput"
          label="Order"
          className="mb-3 floating-label"
        >
          <Form.Select
            onChange={(e) => {
              props.onOrderSubmit(e.target.value.toString())
            }}
          >
            {ingredientOrderTypes.map((order) => (
              <option value={order}>{order}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingNameInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setfilterName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingAbvInput"
          label="Abv (%)"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => setfilterAbv(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingTypeInput"
          label="Type"
          className="mb-3"
        >
          <Form.Select onChange={(e) => setfilterType(e.target.value)}>
            <option></option>
            {ingredientTypeArray.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <div className="filter-buttons">
          <Button type="submit">Filter</Button>
        </div>
      </Stack>
    </Form>
  )
}

export default IngredientFilter
