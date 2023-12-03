import React, { useState, SyntheticEvent } from "react"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import { IngredientType, ingredientTypeArray } from "../Types"

type ingredientFormProps = {
  onFormSubmit: (formResults: IngredientType) => void
  id: string
  name: string
  abv: string
  type: string
}
const IngredientForm = (props: ingredientFormProps) => {
  const [formName, setFormName] = useState(props.name)
  const [formAbv, setFormAbv] = useState(props.abv)
  const [formType, setFormType] = useState(props.type)

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    
    const formResult = {
      _id: "",
      name: formName,
      abv: formAbv === '' ? 0 : parseInt(formAbv, 10),
      type: formType,
    } satisfies IngredientType
    props.onFormSubmit(formResult)
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <FloatingLabel
        controlId="floatingNameInput"
        label={"Name"}
        className="mb-3"
      >
        <Form.Control
          type="text"
          onChange={(e) => setFormName(e.target.value)}
          defaultValue={formName}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingAbvInput"
        label="Abv (%)"
        className="mb-3"
      >
        <Form.Control
          type="text"
          onChange={(e) => setFormAbv(e.target.value)}
          defaultValue={formAbv}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTypeInput"
        label="Type"
        className="mb-3"
      >
        <Form.Select onChange={(e) => setFormType(e.target.value)} 
        defaultValue={formType === '' ? "Select type" : formType}>
          {formType === '' && <option disabled>Select type</option>}
          {ingredientTypeArray.map((type) => (
            <option value={type}>{type}</option>
          ))}
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
