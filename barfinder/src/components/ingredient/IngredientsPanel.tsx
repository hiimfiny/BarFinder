import React from 'react'
import Ingredient from './Ingredient'
import { Ingredients } from '../../data/IngredientsData'

const IngredientsPanel = () => {
  return (
    <div>{Ingredients.map( item => (
        <Ingredient name = {item.name} abv={item.abv} type={item.type}/>
    ))}</div>
  )
}

export default IngredientsPanel