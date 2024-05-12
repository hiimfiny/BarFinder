import React, { useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"
import { DrinkType, FilterDrinkType } from "../Types"
import DrinkForm from "./DrinkForm"
import Drink from "./Drink"
import DrinkFilter from "./DrinkFilter"
import PaginationPanel from "../PaginationPanel"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getFavourited, getUserId } from "../../features/UserSlice"
import { getDrinks } from "../../features/ListSlice"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
type DrinkPanelProps = {
  DrinksList: DrinkType[]
  favouritedByUser: string[]
  changeDrinks: (array: DrinkType[]) => void
  adminUser: boolean
  IngredientList: string[]
  changeFavourite: (list: string, array: string[]) => void
  user_id: string
}

const DrinkPanel = (props: DrinkPanelProps) => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(getUserId)
  const favourited = useAppSelector(getFavourited).drinks
  const drinkList = useAppSelector(getDrinks)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const page_size = 5
  const [DrinksList, setDrinksList] = useState(props.DrinksList)
  const [filterDrinksList, setFilterDrinksList] = useState(props.DrinksList)
  const [favouritedByUser, setFavouritedByUser] = useState(
    props.favouritedByUser
  )
  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const handleCloseForm = () => setShowForm(false)
  const handleShowForm = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const clearFilter = () => {
    setFilterDrinksList(DrinksList)
  }

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
    props.changeFavourite("drink", array)
    axios
      .post(`http://localhost:5000/users/update-drinks/${props.user_id}`, {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: DrinkType) => {
    console.log(formResults)
    handleCloseForm()

    axios
      .post("http://localhost:5000/drinks/add", formResults)
      .then((res) => console.log(res.data))
    props.changeDrinks([...DrinksList, formResults])
    setDrinksList([...DrinksList, formResults])
    setFilterDrinksList([...filterDrinksList, formResults])
  }

  const onFilterSubmit = (filterResults: FilterDrinkType) => {
    const formResultList = DrinksList.filter(
      (filterItem) =>
        (filterResults.name !== "" && filterItem.name === filterResults.name) ||
        (filterResults.type !== "" && filterItem.type === filterResults.type) ||
        (filterResults.glass !== "" &&
          filterItem.glass === filterResults.glass) ||
        (filterResults.ingredients[0] !== "" &&
          filterItem.ingredients.includes(filterResults.ingredients[0]))
    )
    setFilterDrinksList(formResultList)
    handleShowFilter()
  }

  const onEditClick = (formResults: DrinkType) => {
    axios
      .post(
        "http://localhost:5000/drinks/update/" + formResults._id,
        formResults
      )
      .then((res) => console.log(res.data))
    console.log(formResults)
    const updatedDrinks = DrinksList.map((item) => {
      if (item._id === formResults._id) {
        return { ...item, ...formResults }
      }
      return item
    })
    props.changeDrinks(updatedDrinks)
    setDrinksList(updatedDrinks)
    setFilterDrinksList(updatedDrinks)
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/drinks/" + id)
      .then((res) => console.log(res.data))

    let newList = filterDrinksList.filter((el) => el._id !== id)

    setFilterDrinksList(newList)
    props.changeDrinks(newList)
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
            {showFilter ? "Hide filter" : "Filter drinks"}
          </Button>
          <Button variant="primary" onClick={clearFilter}>
            Clear filter
          </Button>
          {props.adminUser && (
            <Button variant="primary" onClick={handleShowForm}>
              Add drink
            </Button>
          )}
        </Stack>
        <br />
        {showFilter && (
          <DrinkFilter
            onFilterSubmit={onFilterSubmit}
            ingredientList={props.IngredientList}
          ></DrinkFilter>
        )}

        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Drink</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DrinkForm
              onFormSubmit={onFormSubmit}
              id={""}
              name={""}
              type={""}
              ingredients={[]}
              glass={""}
              img={""}
              ingredientList={props.IngredientList}
            ></DrinkForm>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {filterDrinksList.length === 0 ? (
          <div>Nothing to show</div>
        ) : (
          <div>
            <Stack gap={3}>
              {filterDrinksList
                .slice(
                  (pageNumber - 1) * page_size,
                  (pageNumber - 1) * page_size + page_size
                )
                .map((item) => (
                  <div>
                    <Drink
                      key={item._id}
                      _id={item._id}
                      name={item.name}
                      type={item.type}
                      ingredients={item.ingredients}
                      glass={item.glass}
                      img={item.img}
                      onFavouriteClick={onFavouriteClick}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
                      isFavourited={favouritedByUser.includes(item._id)}
                      adminUser={props.adminUser}
                      ingredientsList={props.IngredientList}
                    ></Drink>
                  </div>
                ))}
            </Stack>
          </div>
        )}

        <div className="pagination-card">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={drinkList.length}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default DrinkPanel
