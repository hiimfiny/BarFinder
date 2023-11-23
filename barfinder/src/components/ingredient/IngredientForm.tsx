import React, { useState, SyntheticEvent } from "react"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import { IngredientType } from "../../data/IngredientsData"

type ingredientFormProps = {
  onFormSubmit: (formResults: IngredientType) => void
}
const IngredientForm = (props: ingredientFormProps) => {
  const [formName, setFormName] = useState("")
  const [formAbv, setFormAbv] = useState("")
  const [formType, setFormType] = useState("")

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const formResult = {
      id: "drink3",
      name: formName,
      abv: parseInt(formAbv, 10),
      type: formType,
    } satisfies IngredientType
    props.onFormSubmit(formResult)
  }
  

  return (
    <Form onSubmit={onFormSubmit}>
      <FloatingLabel
        controlId="floatingNameInput"
        label="Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder=""
          onChange={(e) => setFormName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingAbvInput"
        label="Abv (%)"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder=""
          onChange={(e) => setFormAbv(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTypeInput"
        label="Type"
        className="mb-3"
      >
        <Form.Select onChange={(e) => setFormType(e.target.value)}>
          <option>Select type</option>
          <option value="spirit">Spirit</option>
          <option value="beer">Beer</option>
          <option value="wine">Wine</option>
        </Form.Select>
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br />
    </Form>
  )
}

export default IngredientForm
