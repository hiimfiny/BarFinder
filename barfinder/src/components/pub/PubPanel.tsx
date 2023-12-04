import React, { useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"
import PaginationPanel from "../PaginationPanel"

import { PubType, FilterPubType } from "../Types"
import Pub from "./Pub"
import PubFilter from "./PubFilter"
import PubForm from "./PubForm"
import axios from "axios"
type PubPanelProps = {
  pubsList: PubType[]
  favouritedByUser: string[]
  changePubs: (array: PubType[]) => void
  adminUser: boolean
  IngredientList: string[]
  changeFavourite: (list: string, array: string[]) => void
}

const PubPanel = (props: PubPanelProps) => {
  const page_size = 5

  const [pubsList, setPubsList] = useState(props.pubsList)
  const [filterPubsList, setFilterPubsList] = useState(props.pubsList)
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
  const clearFilter = () => {
    setFilterPubsList(pubsList)
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
    props.changeFavourite("pub", array)
    axios
      .post(
        "http://localhost:5000/users/update-pubs/6569189fa362f81f37d14e72",
        {
          favouritedArray: array,
        }
      )
      .then((res) => console.log(res.data))
  }

  const onFormSubmit = (formResults: PubType) =>{
    console.log(formResults)
    handleCloseForm()
  }

  const onEditClick = (formResults: PubType) => {
    
  }

  const onDeleteClick = (id: string) => {
    
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
          {props.adminUser && (
            <Button variant="primary" onClick={handleShowForm}>
              Add pub
            </Button>
          )}
        </Stack>
        <br />
        {showFilter && <div></div>}

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
            opentime={[]}

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
                        isFavourited={favouritedByUser.includes(item._id)}
                        adminUser={props.adminUser}
                        ingredientsList={props.IngredientList}
                    ></Pub>
                  </div>
                ))}
            </Stack>
          </div>
        )}
      </div>
      <PaginationPanel
        currentPage={pageNumber}
        totalElements={10}
        pageSize={page_size}
        selectPage={handleSelectPage}
      ></PaginationPanel>
    </div>
  )
}

export default PubPanel
