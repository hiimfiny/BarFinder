export type UserIngredientType = {
    id: string
    isFavourited: boolean
  }
  
  let UserIngredients: UserIngredientType[] = []
  
  let vodka = { id: "drink1", isFavourited: false }
  let rum = { id: "drink2", isFavourited: false }
  
  UserIngredients.push(vodka)
  UserIngredients.push(rum)
  export { UserIngredients }
  