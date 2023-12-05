import React, { useState } from "react"
import { Form, FloatingLabel, Button, Stack } from "react-bootstrap"
import { DrinkType, drinkTypeArray, drinkGlassArray } from "../Types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import ObjectId from "bson-objectid"
library.add(faPlusCircle, faTimes)

type DrinkFormProps = {
  onFormSubmit: (formResults: DrinkType) => void
  id: string
  name: string
  type: string
  ingredients: string[]
  glass: string
  img: string
  ingredientList: string[]
}

const DrinkForm = (props: DrinkFormProps) => {
  const [formName, setFormName] = useState(props.name)
  const [formType, setFormType] = useState(props.type)
  const [formIngredients, setFormIngredients] = useState(props.ingredients)
  const [formGlass, setFormGlass] = useState(props.glass)
  const [formImg, setFormImg] = useState(props.img)
  const [selectedIngredient, setSelectedIngredient] = useState("")

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formResult = {
      _id: new ObjectId().toString(),
      name: formName,
      type: formType,
      ingredients: formIngredients,
      glass: formGlass,
      img: formImg,
    }
    props.onFormSubmit(formResult)
  }

  const addToFormIngredients = (item: string) => {
    if (!formIngredients.includes(item))
      setFormIngredients([...formIngredients, item])
  }
  const removeFromIngredients = (item: string) => {
    if (formIngredients.includes(item))
      setFormIngredients(
        formIngredients.filter((filterItem) => filterItem !== item)
      )
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
          onChange={(e) => setFormName(e.target.value)}
          defaultValue={formName}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTypeInput"
        label="Type"
        className="mb-3"
      >
        <Form.Select
          onChange={(e) => setFormType(e.target.value)}
          defaultValue={formType === "" ? "Select type" : formType}
        >
          {formType === "" && <option disabled>Select type</option>}
          {drinkTypeArray.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingGlassInput"
        label="Glass"
        className="mb-3"
      >
        <Form.Select
          onChange={(e) => setFormGlass(e.target.value)}
          defaultValue={formGlass === "" ? "Select glass" : formGlass}
        >
          {formGlass === "" && <option disabled>Select glass</option>}
          {drinkGlassArray.map((glass) => (
            <option value={glass}>{glass}</option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingImgInput"
        label="Image"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Insert the url of the image"
          onChange={(e) => setFormImg(e.target.value)}
          defaultValue={formImg === "" ? "" : formImg}
        />
      </FloatingLabel>
      <div>
        Ingredients:{" "}
        {formIngredients.map((item) => (
          <div>
            {item + " "}
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                removeFromIngredients(item)
              }}
            />
          </div>
        ))}
      </div>
      <Stack
        direction="horizontal"
        gap={3}
        className="d-flex justify-content-center"
      >
        <Form.Select onChange={(e) => setSelectedIngredient(e.target.value)}>
          <option>Select ingredient</option>
          {props.ingredientList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </Form.Select>
        <Button
          onClick={() => {
            addToFormIngredients(selectedIngredient)
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </Stack>

      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br />
    </Form>
  )
}

export default DrinkForm
