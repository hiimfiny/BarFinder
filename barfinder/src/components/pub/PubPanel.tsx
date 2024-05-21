import React, { useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"
import PaginationPanel from "../PaginationPanel"

import {
  PubType,
  FilterPubType,
  defaultOpeningTime,
  DrinkType,
  calculateAvgRating,
  menuContainsDrink,
} from "../Types"
import Pub from "./Pub"
import PubFilter from "./PubFilter"
import PubForm from "./PubForm"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getDrinks,
  getIngredients,
  getPubs,
  setPubs,
} from "../../features/ListSlice"
import {
  getFavourited,
  getRole,
  getUserId,
  setFavouritedPubs,
} from "../../features/UserSlice"

//TODO style add and edit form
//TODO filter
//TODO add redux
const PubPanel = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(getUserId)
  const user_role = useAppSelector(getRole)
  const user_admin = user_role === "admin"
  const favourited = useAppSelector(getFavourited).pubs

  const pubsList = useAppSelector(getPubs)
  const ingredientList = useAppSelector(getIngredients)
  const drinksList = useAppSelector(getDrinks)
  const page_size = 5
  const [filterPubsList, setFilterPubsList] = useState(pubsList)

  const [showForm, setShowForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)

  const handleCloseForm = () => setShowForm(false)
  const handleShowForm = () => setShowForm(true)

  const handleShowFilter = () => setShowFilter(!showFilter)

  const handleSelectPage = (selected_number: number) => {
    setPageNumber(selected_number)
  }
  const clearFilter = () => {
    setFilterPubsList(pubsList)
  }

  const onLocationPinClick = (pubId: string) => {
    console.log(pubId)
  }

  const onFavouriteClick = (id: string) => {
    let array = favourited
    if (array.includes(id)) {
      array = array.filter((item) => item !== id)
    } else {
      array = [...array, id]
    }
    dispatch(setFavouritedPubs(array))

    axios
      .post(`http://localhost:5000/users/update-pubs/${user_id}`, {
        favouritedArray: array,
      })
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: PubType) => {
    handleCloseForm()

    axios
      .post("http://localhost:5000/pubs/add", formResults)
      .then((res) => console.log(res.data))

    dispatch(setPubs([...pubsList, formResults]))
    setFilterPubsList([...pubsList, formResults])
  }

  const onEditClick = (formResults: PubType) => {
    axios
      .post("http://localhost:5000/pubs/update/" + formResults._id, formResults)
      .then((res) => console.log(res.data))

    const updatedPubs = pubsList.map((item) => {
      if (item._id === formResults._id) {
        return { ...item, ...formResults }
      }
      return item
    })

    dispatch(setPubs(updatedPubs))
    setFilterPubsList(updatedPubs)
  }

  const onFilterSubmit = (filterResults: FilterPubType) => {
    console.log(filterResults)
    const formResultList = pubsList.filter(
      (filterItem) =>
        (filterResults.name !== "" && filterItem.name === filterResults.name) ||
        (filterResults.rating !== 0 &&
          calculateAvgRating(filterItem.ratings) >= filterResults.rating) ||
        (filterResults.drink !== "" &&
          menuContainsDrink(filterItem.menu, filterResults.drink))
    )
    setFilterPubsList(formResultList)
    handleShowFilter()
  }

  const onDeleteClick = (id: string) => {
    axios
      .delete("http://localhost:5000/pubs/" + id)
      .then((res) => console.log(res.data))

    let newList = filterPubsList.filter((item) => item._id !== id)
    setFilterPubsList(newList)
    dispatch(setPubs(newList))
  }
  const onRateClick = (ratings: number[], id: string) => {
    axios
      .post("http://localhost:5000/pubs/update-rating/" + id, ratings)
      .then((res) => console.log(res.data))
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
            {showFilter ? "Hide filter" : "Filter pubs"}
          </Button>
          <Button variant="primary" onClick={clearFilter}>
            Clear filter
          </Button>
          {user_admin && (
            <Button variant="primary" onClick={handleShowForm}>
              Add pub
            </Button>
          )}
        </Stack>
        <br />
        {showFilter && (
          <PubFilter
            onFilterSubmit={onFilterSubmit}
            drinksList={drinksList}
          ></PubFilter>
        )}

        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Pub</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PubForm
              onFormSubmit={onFormSubmit}
              id={""}
              name={""}
              address={""}
              location={[]}
              menu={[]}
              opentime={defaultOpeningTime}
            ></PubForm>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {filterPubsList.length === 0 ? (
          <div>Nothing to show</div>
        ) : (
          <div>
            <Stack gap={3}>
              {filterPubsList
                .slice(
                  (pageNumber - 1) * page_size,
                  (pageNumber - 1) * page_size + page_size
                )
                .map((item) => (
                  <div>
                    <Pub
                      key={item._id}
                      _id={item._id}
                      name={item.name}
                      address={item.address}
                      location={item.location}
                      ratings={item.ratings}
                      menu={item.menu}
                      opentime={item.opentime}
                      onFavouriteClick={onFavouriteClick}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
                      onRateClick={onRateClick}
                      isFavourited={favourited.includes(item._id)}
                      adminUser={user_admin}
                      ingredientsList={ingredientList}
                    ></Pub>
                  </div>
                ))}
            </Stack>
          </div>
        )}
      </div>
      <PaginationPanel
        currentPage={pageNumber}
        totalElements={filterPubsList.length}
        pageSize={page_size}
        selectPage={handleSelectPage}
      ></PaginationPanel>
    </div>
  )
}

export default PubPanel
