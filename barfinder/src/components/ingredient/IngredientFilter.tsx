import React, { useState, SyntheticEvent } from "react"
import { Form, Stack, Button, FloatingLabel } from "react-bootstrap"
import { FilterIngredientType,ingredientTypeArray, ingredientOrderTypes } from "../Types"

type ingredientFilterProps = {
  onFilterSubmit: (formResults: FilterIngredientType) => void
  onOrderSubmit: (order: string) => void
}

const IngredientFilter = (props: ingredientFilterProps) => {
  const [filterName, setfilterName] = useState("")
  const [filterAbv, setfilterAbv] = useState("")
  const [filterType, setfilterType] = useState("")
  
  const onFilterSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const filterResult = {
      name: filterName,
      abv: filterAbv === "" ? 0 : parseInt(filterAbv, 10),
      type: filterType,
    }
    props.onFilterSubmit(filterResult)
  }

  return (
    <Form onSubmit={onFilterSubmit} className="centered-panel-element">
      <Stack
        direction="horizontal"
        gap={3}
        className="d-flex justify-content-center"
      >
        <FloatingLabel
          controlId="floatingOrderInput"
          label="Order"
          className="mb-3"
        >
        <Form.Select onChange={(e)=>{props.onOrderSubmit(e.target.value.toString())}}>
            
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

        <Button type="submit">Filter</Button>
      </Stack>
    </Form>
  )
}

export default IngredientFilter
