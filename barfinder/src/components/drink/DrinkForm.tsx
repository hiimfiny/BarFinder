import React, { useState } from "react"
import { Button } from "primereact/button"
import { DrinkType, drinkTypeArray, drinkGlassArray } from "../Types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import ObjectId from "bson-objectid"
import { useAppSelector } from "../../app/hooks"
import { getIngredients } from "../../features/ListSlice"
import { Drink } from "../../features/ListSlice"
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete"
import "../../components/list.css"
library.add(faPlusCircle, faTimes)
type DrinkFormProps = {
  onFormSubmit: (formResult: Drink) => void
  id: string
  name: string
  type: string
  ingredients: string[]
  glass: string
  img: string
}

const DrinkForm = (props: DrinkFormProps) => {
  const [formName, setFormName] = useState(props.name)
  const [formType, setFormType] = useState(props.type)
  const [formIngredients, setFormIngredients] = useState(props.ingredients)
  const [formGlass, setFormGlass] = useState(props.glass)
  const [formImg, setFormImg] = useState(props.img)
  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [value, setValue] = useState("")
  const [items, setItems] = useState<string[]>([])
  const ingredientList = useAppSelector(getIngredients)

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formResult = {
      _id: new ObjectId().toString(),
      name: formName,
      type: formType,
      ingredients: formIngredients,
      glass: formGlass,
      img: formImg,
    } satisfies Drink
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

  const search = (event: AutoCompleteCompleteEvent) => {
    const searchTerm = event.query.toLowerCase()
    const filteredIngredients = ingredientList.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm)
    )
    const ingredientNames = filteredIngredients.map(
      (ingredient) => ingredient.name
    )
    setItems(ingredientNames)
  }

  return (
    <form onSubmit={onFormSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="form-group-half">
          <div>
            <label htmlFor="typeSelect" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="typeSelect"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            >
              <option value="">Select type</option>
              {drinkTypeArray.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group-half">
            <div>
              <label htmlFor="glassSelect" className="form-label">
                Glass
              </label>
              <select
                className="form-select"
                id="glassSelect"
                value={formGlass}
                onChange={(e) => setFormGlass(e.target.value)}
              >
                <option value="">Select glass</option>
                {drinkGlassArray.map((glass) => (
                  <option key={glass} value={glass}>
                    {glass}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="imgInput" className="form-label">
          Image
        </label>
        <input
          type="text"
          className="form-control"
          id="imgInput"
          placeholder="Insert the URL of the image"
          value={formImg}
          onChange={(e) => setFormImg(e.target.value)}
        />
      </div>
      <div className="form-group">
        Ingredients:{" "}
        {formIngredients.map((item) => (
          <div key={item}>
            {item + " "}
            <Button
              icon="pi pi-times"
              onClick={() => removeFromIngredients(item)}
            ></Button>
          </div>
        ))}
      </div>
      <div className="form-group">
        <div className="form-group-half">
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={search}
            onChange={(e) => {
              setValue(e.value)
              setSelectedIngredient(e.value)
            }}
            dropdown
          />
          <Button
            className="form-button"
            icon="pi pi-plus-circle"
            onClick={(e) => {
              e.preventDefault()
              addToFormIngredients(selectedIngredient)
            }}
          ></Button>
        </div>
      </div>

      <div className="form-group">
        <Button type="submit" label="Submit" className="form-button" />
      </div>
    </form>
  )
}

export default DrinkForm
