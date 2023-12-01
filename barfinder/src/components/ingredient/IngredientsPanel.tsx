import React, { useEffect, useState } from "react"
import { Button, Modal, Stack, Pagination } from "react-bootstrap"
import Ingredient from "./Ingredient"
import IngredientForm from "./IngredientForm"
import IngredientFilter from "./IngredientFilter"

import {
  IngredientType,
  filterIngredientType,
  Ingredients,
} from "../../data/IngredientsData"
import { UserIngredients } from "../../data/UserIngredientData"
import axios from "axios"

const IngredientsPanel = () => {
  const page_size = 5
  const page_number = 1
  const defaultIngredients: IngredientType[] = []
  const [IngredientsList, setIngredientsList] = useState(defaultIngredients)
  const [FilteredIngredientsList, setFilteredIngredientsList] =
    useState(defaultIngredients)

  const [favouritedByUser, setFavouritedByUser] = useState([""])
  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:5000/ingredients/")
      .then((res) => {
        console.log(res.data)
        setIngredientsList(res.data)
        setFilteredIngredientsList(
          res.data.slice(
            (page_number - 1) * page_size,
            (page_number - 1) * page_size + page_size
          )
        )
      })
      .catch((error) => console.log(error))

    axios
      .get("http://localhost:5000/users/6569189fa362f81f37d14e72")
      .then((res) => {
        console.log(res.data)
        setFavouritedByUser(res.data)
      })
  }, [])

  const handleCloseForm = () => setShowForm(false)
  const handleShowForm = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const onFavouriteClick = (id: string) => {
    console.log(id + " favourited")
    console.log(favouritedByUser)
    let array = favouritedByUser
    console.log(array)
    if (array.includes(id)) {
      array = array.filter((item) => item !== id)
    } else {
      array = [...array, id]
    }
    setFavouritedByUser(array)
    axios
      .post("http://localhost:5000/users/update/6569189fa362f81f37d14e72", {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: IngredientType) => {
    handleCloseForm()

    axios
      .post("http://localhost:5000/ingredients/add", formResults)
      .then((res) => console.log(res.data))

    setFilteredIngredientsList([...FilteredIngredientsList, formResults])
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

  const onEditClick = (formResults: IngredientType) => {
    axios
      .post(
        "http://localhost:5000/ingredients/update/" + formResults._id,
        formResults
      )
      .then((res) => console.log(res.data))
    console.log(formResults)
    const updatedIngredients = IngredientsList.map((item) => {
      if (item._id === formResults._id) {
        return { ...item, ...formResults }
      }
      return item
    })

    setIngredientsList(updatedIngredients)
    setFilteredIngredientsList(updatedIngredients)
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/ingredients/" + id)
      .then((res) => console.log(res.data))

    setFilteredIngredientsList(
      FilteredIngredientsList.filter((el) => el._id !== id)
    )
  }

  return (
    <div>
      <div>
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-center"
        >
          <Button variant="primary" onClick={handleShowFilter}>
            {showFilter ? "Hide filter" : "Filter ingredients"}
          </Button>
          <Button variant="primary" onClick={clearFilter}>
            Clear filter
          </Button>
          <Button variant="primary" onClick={handleShowForm}>
            Add ingredient
          </Button>
        </Stack>
        <br />
        {showFilter && <IngredientFilter onFilterSubmit={onFilterSubmit} />}
        <br />

        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add an ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IngredientForm
              onFormSubmit={onFormSubmit}
              id={""}
              name={""}
              abv={"0"}
              type={""}
            ></IngredientForm>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Stack gap={3}>
          {FilteredIngredientsList.map((item) => (
            <div>
              <Ingredient
                key={item._id}
                _id={item._id}
                name={item.name}
                abv={item.abv}
                type={item.type}
                onFavouriteClick={onFavouriteClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                isFavourited={favouritedByUser.includes(item._id)}
              />
            </div>
          ))}
        </Stack>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
        </Pagination>
      </div>
    </div>
  )
}

export default IngredientsPanel
