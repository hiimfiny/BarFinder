export type IngredientType = {
  id: string
  //img: string
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

let vodka = { id: "drink1", name: "Vodka", abv: 40, type: "spirit" }
let rum = { id: "drink2", name: "Rum", abv: 40, type: "spirit" }

Ingredients.push(vodka)
Ingredients.push(rum)
export { Ingredients }
