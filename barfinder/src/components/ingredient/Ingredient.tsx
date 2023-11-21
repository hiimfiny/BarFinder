import React from 'react'
import Card from '../Card'
import { IngredientType} from '../../data/IngredientsData'


const Ingredient = (props: IngredientType) => {
  return (
    <Card>
      <div className="drink-card">
        <div></div>
        <div className="drink-name">{props.name}</div>
        <div className="drink-buttons">
          <button>☆</button>

        </div>
      </div>
    </Card>
  )
}

export default Ingredient