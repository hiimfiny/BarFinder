import React, { useState } from "react"
import { Form, Stack, Button, FloatingLabel } from "react-bootstrap"
import { FilterDrinkType, drinkTypeArray, drinkGlassArray } from "../Types"

type DrinkFilterProps = {
  onFilterSubmit: (formResults: FilterDrinkType) => void
  ingredientList: string[]
}

const DrinkFilter = (props: DrinkFilterProps) => {
  const [filterName, setFilterName] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterGlass, setFilterGlass] = useState("")
  const [filterIngredient, setFilterIngredient] = useState("")

  const onFilterSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const filterResult = {
      name: filterName,
      type: filterType,
      glass: filterGlass,
      ingredients: [filterIngredient],
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
          controlId="floatingNameInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            
            onChange={(e) => setFilterName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingTypeInput"
          label="Type"
          className="mb-3"
        >
          <Form.Select onChange={(e) => setFilterType(e.target.value)}>
            <option></option>
            {drinkTypeArray.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingFlassInput"
          label="Glass"
          className="mb-3"
        >
          <Form.Select onChange={(e) => setFilterGlass(e.target.value)}>
            <option></option>
            {drinkGlassArray.map((glass) => (
              <option value={glass}>{glass}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingFlassInput"
          label="Ingredient"
          className="mb-3"
        >
          <Form.Select onChange={(e) => setFilterIngredient(e.target.value)}>
            <option></option>
            {props.ingredientList.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button type="submit">Filter</Button>
      </Stack>
    </Form>
  )
}

export default DrinkFilter
