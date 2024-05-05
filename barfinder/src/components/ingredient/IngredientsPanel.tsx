import React, { useState, useEffect } from "react"

import { Button, Modal, Stack } from "react-bootstrap"
import IngredientItem from "./Ingredient"
import IngredientForm from "./IngredientForm"
import IngredientFilter from "./IngredientFilter"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getFavourited,
  getUserId,
  setFavouritedIngredients,
} from "../../features/UserSlice"
import { getIngredients, setIngredients } from "../../features/ListSlice"
import { Ingredient, defaultIngredient } from "../../features/IngredientSlice"

type IngredientsPanelProps = {
  adminUser: boolean
}

const IngredientsPanel = (props: IngredientsPanelProps) => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(getUserId)
  const favourited = useAppSelector(getFavourited).ingredients
  const ingredientList = useAppSelector(getIngredients)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const [filterResult, setFilterResult] = useState(defaultIngredient)
  const [order, setOrder] = useState("Default")

  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const handleCloseForm = () => setShowForm(false)
  const handleShowForm = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const onFavouriteClick = (id: string) => {
    let array = favourited
    if (array.includes(id)) {
      array = array.filter((item) => item !== id)
    } else {
      array = [...array, id]
    }
    dispatch(setFavouritedIngredients(array))
    axios
      .post(`http://localhost:5000/users/update-ingredients/${user_id}`, {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: Ingredient) => {
    handleCloseForm()
    console.log(formResults)
    axios
      .post("http://localhost:5000/ingredients/add", formResults)
      .then((res) => console.log(res.data))

    dispatch(setIngredients([...ingredientList, formResults]))
  }

  const onFilterSubmit = (filterResults: Ingredient) => {
    console.log("In filtersubmit!")
    console.log(filterResults)
    if (filterResults !== defaultIngredient) {
      console.log("In the if")
      setFilterResult((prevFilterResult) => ({
        ...prevFilterResult,
        ...filterResults,
      }))
    }

    handleShowFilter()
  }

  const applyFilter = () => {
    console.log(filterResult)
    console.log(defaultIngredient)
    if (filterResult === defaultIngredient) console.log("filter===default")
    const formResultList =
      filterResult === defaultIngredient
        ? ingredientList
        : ingredientList.filter(
            (filterItem) =>
              (filterResult.name !== "" &&
                filterItem.name === filterResult.name) ||
              (filterResult.abv !== 0 && filterItem.abv === filterResult.abv) ||
              (filterResult.type !== "" &&
                filterItem.type === filterResult.type)
          )
    return applyOrder(order, formResultList)
  }

  const clearFilter = () => {
    setFilterResult(defaultIngredient)
  }

  const onEditClick = (formResults: Ingredient) => {
    axios
      .post(
        "http://localhost:5000/ingredients/update/" + formResults._id,
        formResults
      )
      .then((res) => console.log(res.data))
    console.log(formResults)
    const updatedIngredients = ingredientList.map((item) => {
      if (item._id === formResults._id) {
        return { ...item, ...formResults }
      }
      return item
    })
    dispatch(setIngredients(updatedIngredients))
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/ingredients/" + id)
      .then((res) => console.log(res.data))

    let newList = ingredientList.filter((item) => item._id !== id)

    dispatch(setIngredients(newList))
  }

  const applyOrder = (order: string, list: Ingredient[]) => {
    let sortedList: Ingredient[] = []
    switch (order) {
      case "Default": {
        sortedList = list.slice().sort((a, b) => {
          const nameA = a._id.toUpperCase()
          const nameB = b._id.toUpperCase()

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        break
      }
      case "ABC^": {
        sortedList = list.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        break
      }
      case "ABCv": {
        sortedList = list.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()

          if (nameB < nameA) {
            return -1
          }
          if (nameB > nameA) {
            return 1
          }
          return 0
        })
        break
      }
    }
    return sortedList
  }

  const onOrderSubmit: (order: string) => void = (order: string) => {
    setOrder(order)
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
        {showFilter && (
          <IngredientFilter
            onFilterSubmit={onFilterSubmit}
            onOrderSubmit={onOrderSubmit}
          />
        )}

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
        {applyFilter().length === 0 ? (
          <div>Nothing to show</div>
        ) : (
          <div>
            <Stack gap={3}>
              {applyFilter()
                .slice(first, first + rows)
                .map((item) => (
                  <div>
                    <IngredientItem
                      key={item._id}
                      _id={item._id}
                      name={item.name}
                      abv={item.abv}
                      type={item.type}
                      onFavouriteClick={onFavouriteClick}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
                      isFavourited={favourited.includes(item._id)}
                      adminUser={props.adminUser}
                    />
                  </div>
                ))}
            </Stack>
          </div>
        )}
        <div className="pagination-card">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={applyFilter().length}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default IngredientsPanel
