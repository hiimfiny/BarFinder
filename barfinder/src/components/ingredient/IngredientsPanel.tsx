import React, { useState } from "react"
import { Button, Modal, Row, Col } from "react-bootstrap"

import Ingredient from "./Ingredient"
import IngredientForm from "./IngredientForm"
import IngredientFilter from "./IngredientFilter"

import {
  IngredientType,
  filterIngredientType,
  Ingredients,
} from "../../data/IngredientsData"
import { UserIngredients } from "../../data/UserIngredientData"

const IngredientsPanel = () => {
  const [IngredientsList, setIngredientsList] = useState(Ingredients)
  const [FilteredIngredientsList, setFilteredIngredientsList] = useState(Ingredients)
  const [userIngredients, setuserIngredients] = useState(UserIngredients)
  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const handleClose = () => setShowForm(false)
  const handleShow = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const onFavouriteClick = (name: string) => {
    UserIngredients.filter((filterItem) => filterItem.id === name).at(
      0
    )!.isFavourited = !UserIngredients.filter(
      (filterItem) => filterItem.id === name
    ).at(0)!.isFavourited
  }

  const onFormSubmit = (formResults: IngredientType) => {
    handleClose()
    console.log(formResults)
    setIngredientsList([...IngredientsList, formResults])
    setFilteredIngredientsList([...FilteredIngredientsList, formResults])
    setuserIngredients([
      ...userIngredients,
      { id: formResults.id, isFavourited: false },
    ])
  }

  const onFilterSubmit = (filterResults: filterIngredientType) => {
    console.log(filterResults)
    const formResultList = IngredientsList.filter(
      (filterItem) => filterItem.name === filterResults.name
    )
    setFilteredIngredientsList(formResultList)
    handleShowFilter()
  }

  const clearFilter = () => {
    setFilteredIngredientsList(IngredientsList)
  }

  return (
    <div>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowFilter}>
            {showFilter ? "Hide filter" : "Filter ingredients"}
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={clearFilter}>
            Clear filter
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Add ingredient
          </Button>
        </Col>
      </Row>
      {showFilter && <IngredientFilter onFilterSubmit={onFilterSubmit} />}
      <br />

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an ingredient to the</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IngredientForm onFormSubmit={onFormSubmit}></IngredientForm>
        </Modal.Body>
      </Modal>
      {FilteredIngredientsList.map((item) => (
        <Ingredient
          key={item.id}
          id={item.id}
          name={item.name}
          abv={item.abv}
          type={item.type}
          onFavouriteClick={onFavouriteClick}
          isFavourited={
            !UserIngredients.filter(
              (filterItem) => filterItem.id === item.id
            ).at(0)?.isFavourited
          }
        />
      ))}
    </div>
  )
}

export default IngredientsPanel
