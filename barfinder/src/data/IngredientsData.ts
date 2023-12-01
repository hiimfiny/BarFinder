export type IngredientType = {
  _id: string
  name: string
  abv: number
  type: string
}
export type filterIngredientType = {
  name: string
  abv: number
  type: string
}

let Ingredients: IngredientType[] = []

let vodka = {_id: "drink1", name: "Vodka", abv: 40, type: "spirit" }
let rum = { _id: "drink2", name: "Rum", abv: 40, type: "spirit" }

Ingredients.push(vodka)
Ingredients.push(rum)
export { Ingredients }
//☆✎✖