import React, { useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"
import Ingredient from "./Ingredient"
import IngredientForm from "./IngredientForm"
import IngredientFilter from "./IngredientFilter"
import PaginationPanel from "../PaginationPanel"

import {
  IngredientType,
  FilterIngredientType,
} from "../Types"

import axios from "axios"

type IngredientsPanelProps = {
  IngredientsList: IngredientType[]

  favouritedByUser: string[]
  changeIngredients: (array: IngredientType[]) => void
  adminUser: boolean
  changeFavourite: (list: string, array: string[]) => void
}

const IngredientsPanel = (props: IngredientsPanelProps) => {
  const page_size = 5
  const [IngredientsList, setIngredientsList] = useState(props.IngredientsList)
  const [FilteredIngredientsList, setFilteredIngredientsList] = useState(
    props.IngredientsList
  )
  const [favouritedByUser, setFavouritedByUser] = useState(
    props.favouritedByUser
  )
  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const handleCloseForm = () => setShowForm(false)
  const handleShowForm = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const handleSelectPage = (selected_number: number) => {
    setPageNumber(selected_number)
  }

  const onFavouriteClick = (id: string) => {
    let array = favouritedByUser
    if (array.includes(id)) {
      array = array.filter((item) => item !== id)
    } else {
      array = [...array, id]
    }
    setFavouritedByUser(array)
    props.changeFavourite('ingredient', array)
    axios
      .post("http://localhost:5000/users/update-ingredients/6569189fa362f81f37d14e72", {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: IngredientType) => {
    handleCloseForm()

    axios
      .post("http://localhost:5000/ingredients/add", formResults)
      .then((res) => console.log(res.data))

    props.changeIngredients([...IngredientsList, formResults])
    setIngredientsList([...IngredientsList, formResults])
    setFilteredIngredientsList([...FilteredIngredientsList, formResults])
  }

  const onFilterSubmit = (filterResults: FilterIngredientType) => {
    console.log(filterResults)
    const formResultList = IngredientsList.filter(
      (filterItem) =>
        (filterResults.name !== "" && filterItem.name === filterResults.name) ||
        (filterResults.abv !== 0 && filterItem.abv === filterResults.abv) ||
        (filterResults.type !== "" && filterItem.type === filterResults.type)
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
    props.changeIngredients(updatedIngredients)
    setIngredientsList(updatedIngredients)
    setFilteredIngredientsList(updatedIngredients)
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/ingredients/" + id)
      .then((res) => console.log(res.data))

    let newList = FilteredIngredientsList.filter((el) => el._id !== id)

    setFilteredIngredientsList(newList)
    props.changeIngredients(newList)
  }

  return (
    <div className="panel">
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
          {props.adminUser && (
            <Button variant="primary" onClick={handleShowForm}>
              Add ingredient
            </Button>
          )}
        </Stack>
        <br />
        {showFilter && <IngredientFilter onFilterSubmit={onFilterSubmit} />}

        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add an ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IngredientForm
              onFormSubmit={onFormSubmit}
              id={""}
              name={""}
              abv={""}
              type={""}
            ></IngredientForm>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {FilteredIngredientsList.length === 0 ? (
          <div>Nothing to show</div>
        ) : (
          <div>
            <Stack gap={3}>
              {FilteredIngredientsList.slice(
                (pageNumber - 1) * page_size,
                (pageNumber - 1) * page_size + page_size
              ).map((item) => (
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
                    adminUser={props.adminUser}
                  />
                </div>
              ))}
            </Stack>
          </div>
        )}

        <PaginationPanel
          currentPage={pageNumber}
          totalElements={FilteredIngredientsList.length}
          pageSize={page_size}
          selectPage={handleSelectPage}
        ></PaginationPanel>
      </div>
    </div>
  )
}

export default IngredientsPanel
