import React, { useState } from "react"

import { DrinkType } from "../Types"

import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import DrinkForm from "./DrinkForm"
import { Ingredient } from "../../features/ListSlice"

//☆✎✖

type DrinkProps = DrinkType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: DrinkType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
  adminUser: boolean
  ingredientsList: Ingredient[]
}

const DrinkItem = (props: DrinkProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const onEditSubmit = (formResult: DrinkType) => {
    formResult._id = props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }
  const header = <div className="drink-card-header">{props.name}</div>
  return (
    <div className="drink-card">
      <Card header={header} className="md:w-25rem">
        <div className="drink-card-content">
          <div className="drink-card-text">
            <img
              src={
                props.img
                  ? props.img
                  : "https://toppng.com/uploads/preview/cocktails-martini-glass-11563660943lpjh5ewack.png"
              }
              alt="Image"
              className="responsive-image"
            />
          </div>
          <div className="ingredient-card-buttons">
            <Button
              className={`p-button-rounded p-button-text p-button-outlined`}
              icon={props.isFavourited ? "pi pi-star-fill" : "pi pi-star"}
              onClick={() => {
                props.onFavouriteClick(props._id)
              }}
            ></Button>
            {props.adminUser && (
              <Button
                className={`p-button-rounded p-button-text p-button-outlined`}
                icon="pi pi-pencil"
                onClick={() => {
                  handleShowEdit()
                }}
              ></Button>
            )}
            {props.adminUser && (
              <Button
                className={`p-button-rounded p-button-text p-button-outlined`}
                icon="pi pi-times"
                onClick={() => props.onDeleteClick(props._id)}
              ></Button>
            )}
          </div>
        </div>
        <div className="drink-ingredients">
          <p>{props.ingredients.join(", ")}</p>
        </div>
      </Card>
      <Dialog
        visible={showEdit}
        onHide={handleCloseEdit}
        //closeIcon={true}
        draggable={false}
        dismissableMask={true}
        header="Edit ingredient"
        className="edit-dialog"
      >
        <DrinkForm
          key={props._id}
          id={props._id}
          name={props.name}
          type={props.type}
          glass={props.glass}
          img={props.img}
          ingredients={props.ingredients}
          onFormSubmit={onEditSubmit}
        ></DrinkForm>
      </Dialog>
    </div>
  )
}

export default DrinkItem
