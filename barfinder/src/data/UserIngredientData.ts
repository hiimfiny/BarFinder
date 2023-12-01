export type UserIngredientType = {
    id: string
    isFavourited: boolean
  }
  
  let UserIngredients: UserIngredientType[] = []
  
  let vodka = { id: "6568c952337861dab730fa27", isFavourited: false }
  let rum = { id: "65690929337861dab730fa29", isFavourited: false }
  
  UserIngredients.push(vodka)
  UserIngredients.push(rum)
  export { UserIngredients }
  