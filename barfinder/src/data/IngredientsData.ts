export type IngredientType = {
  //img: string
  name: string
  abv: number
  type: string
}

let Ingredients: IngredientType[] = []

let vodka = { name: "Vodka", abv: 40, type: "spirit" }
let rum = { name: "Rum", abv: 40, type: "spirit" }

Ingredients.push(vodka)
Ingredients.push(rum)
export { Ingredients }
