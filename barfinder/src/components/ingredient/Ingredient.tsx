import React, { useState } from "react"

import { IngredientType } from "../Types"

import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import IngredientForm from "./IngredientForm"

type IngredientProps = IngredientType & {
  onFavouriteClick: (id: string) => void
  onEditClick: (formResult: IngredientType) => void
  onDeleteClick: (id: string) => void
  isFavourited: boolean
  adminUser: boolean
}

const IngredientItem = (props: IngredientProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)

  const onEditSubmit = (formResult: IngredientType) => {
    formResult._id = props._id
    console.log(formResult)
    props.onEditClick(formResult)
    handleCloseEdit()
  }

  const header = <div className="ingredient-card-header">{props.name}</div>
  return (
    <div className="ingredient-card">
      <Card
        header={header}
        className="md:w-25rem"
        style={{ borderRadius: "10px" }}
      >
        <div className="ingredient-card-content">
          <div className="ingredient-card-text">
            {props.type + (props.abv === 0 ? " " : " (" + props.abv + "%)")}
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
      </Card>
      <Dialog
        visible={showEdit}
        onHide={handleCloseEdit}
        closeIcon={true}
        draggable={false}
        dismissableMask={true}
        header="Edit ingredient"
        className="edit-dialog"
      >
        <div>Edit ingredient</div>
        <IngredientForm
          onFormSubmit={onEditSubmit}
          id={props._id}
          name={props.name}
          abv={props.abv.toString()}
          type={props.type}
        ></IngredientForm>
      </Dialog>
    </div>
  )
}
//☆✎✖
export default IngredientItem
