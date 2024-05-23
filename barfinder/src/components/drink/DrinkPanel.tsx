import React, { useState } from "react"
import { Button, Stack } from "react-bootstrap"
import { DrinkType, FilterDrinkType } from "../Types"
import DrinkForm from "./DrinkForm"
import DrinkItem from "./Drink"
import DrinkFilter from "./DrinkFilter"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getFavourited, getRole, getUserId } from "../../features/UserSlice"
import { getDrinks, getIngredients, setDrinks } from "../../features/ListSlice"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import { Dialog } from "primereact/dialog"
import { setFavouritedDrinks } from "../../features/UserSlice"
import { Drink, defaultDrink } from "../../features/ListSlice"

//TODO style cards, add scrollpanel
const DrinkPanel = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(getUserId)
  const user_role = useAppSelector(getRole)
  const user_admin = user_role === "admin"
  const favourited = useAppSelector(getFavourited).drinks
  const drinkList = useAppSelector(getDrinks)
  const ingredientList = useAppSelector(getIngredients)
  const [filterResult, setFilterResult] = useState(defaultDrink)

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first)
    setRows(event.rows)
  }

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
    dispatch(setFavouritedDrinks(array))
    axios
      .post(`http://localhost:5000/users/update-drinks/${user_id}`, {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResult: Drink) => {
    console.log(formResult)
    handleCloseForm()

    axios
      .post("http://localhost:5000/drinks/add", formResult)
      .then((res) => console.log(res.data))

    dispatch(setDrinks([...drinkList, formResult]))
  }

  const onFilterSubmit = (filterResults: FilterDrinkType) => {
    console.log("In filtersubmit!")
    console.log(filterResults)
    if (filterResults !== defaultDrink) {
      console.log("In the if")
      setFilterResult((prevFilterResult) => ({
        ...prevFilterResult,
        ...filterResults,
      }))
    }
    console.log(filterResults)

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
    const updatedDrinks = drinkList.map((item) => {
      if (item._id === formResults._id) {
        return { ...item, ...formResults }
      }
      return item
    })
    dispatch(setDrinks(updatedDrinks))
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/drinks/" + id)
      .then((res) => console.log(res.data))

    let newList = drinkList.filter((el) => el._id !== id)
    dispatch(setDrinks(newList))
  }

  const applyFilter = () => {
    const formResultList =
      filterResult === defaultDrink
        ? drinkList
        : drinkList.filter(
            (filterItem) =>
              (filterResult.name !== "" &&
                filterItem.name === filterResult.name) ||
              (filterResult.type !== "" &&
                filterItem.type === filterResult.type) ||
              (filterResult.glass !== "" &&
                filterItem.glass === filterResult.glass) ||
              (filterResult.ingredients[0] !== "" &&
                filterItem.ingredients.includes(filterResult.ingredients[0]))
          )
    console.log(formResultList)
    return formResultList
  }

  const clearFilter = () => {
    setFilterResult(defaultDrink)
    setShowFilter(false)
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
          {user_admin && (
            <Button variant="primary" onClick={handleShowForm}>
              Add drink
            </Button>
          )}
        </Stack>
        <br />
        {showFilter && (
          <DrinkFilter
            onFilterSubmit={onFilterSubmit}
            ingredientList={ingredientList}
          ></DrinkFilter>
        )}
        <Dialog
          visible={showForm}
          onHide={handleCloseForm}
          draggable={false}
          dismissableMask={true}
          header="Add a drink"
          className="edit-dialog"
        >
          <DrinkForm
            onFormSubmit={onFormSubmit}
            id={""}
            name={""}
            type={""}
            ingredients={[]}
            glass={""}
            img={""}
          ></DrinkForm>
        </Dialog>
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
                    <DrinkItem
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
                      isFavourited={favourited.includes(item._id)}
                      adminUser={user_admin}
                      ingredientsList={ingredientList}
                    ></DrinkItem>
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
