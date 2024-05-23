const request = require("supertest")
const app = require("../server") // Assuming your Express app is exported from server.js
const mongoose = require("mongoose")
const Ingredients = require("../models/ingredient_model")

beforeAll(async () => {
  // Connect to MongoDB before running tests
  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
})

afterAll(async () => {
  // Disconnect from MongoDB after running tests
  await mongoose.disconnect()
})

describe("Ingredient Routes", () => {
  beforeEach(async () => {
    // Clear the Ingredients collection before each test
    await Ingredients.deleteMany()
  })

  it("should get all ingredients", async () => {
    // Add some test ingredients
    await Ingredients.create([
      { name: "Ingredient 1", abv: 5, type: "Type A" },
      { name: "Ingredient 2", abv: 10, type: "Type B" },
    ])

    // Make a GET request to retrieve all ingredients
    const response = await request(app).get("/ingredients")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body[0].name).toBe("Ingredient 1")
    expect(response.body[1].name).toBe("Ingredient 2")
  })

  it("should add a new ingredient", async () => {
    // Make a POST request to add a new ingredient
    const response = await request(app)
      .post("/ingredients/add")
      .send({ name: "New Ingredient", abv: 8, type: "Type C" })

    expect(response.status).toBe(200)
    expect(response.body).toBe("Ingredient added")

    // Check if the ingredient was added to the database
    const ingredient = await Ingredients.findOne({ name: "New Ingredient" })
    expect(ingredient).toBeTruthy()
    expect(ingredient.abv).toBe(8)
    expect(ingredient.type).toBe("Type C")
  })

  it("should update an existing ingredient", async () => {
    // Add a test ingredient to update
    const existingIngredient = await Ingredients.create({
      name: "Existing Ingredient",
      abv: 5,
      type: "Type D",
    })

    // Make a POST request to update the ingredient
    const updatedName = "Updated Ingredient"
    const response = await request(app)
      .post(`/ingredients/update/${existingIngredient._id}`)
      .send({ name: updatedName, abv: 10, type: "Type E" })

    expect(response.status).toBe(200)
    expect(response.body).toBe("Ingredient updated!")

    // Check if the ingredient was updated in the database
    const updatedIngredient = await Ingredients.findById(existingIngredient._id)
    expect(updatedIngredient.name).toBe(updatedName)
    expect(updatedIngredient.abv).toBe(10)
    expect(updatedIngredient.type).toBe("Type E")
  })

  it("should delete an existing ingredient", async () => {
    // Add a test ingredient to delete
    const existingIngredient = await Ingredients.create({
      name: "Ingredient to Delete",
      abv: 5,
      type: "Type F",
    })

    // Make a DELETE request to delete the ingredient
    const response = await request(app).delete(
      `/ingredients/${existingIngredient._id}`
    )

    expect(response.status).toBe(200)
    expect(response.body).toBe("Ingredient deleted")

    // Check if the ingredient was deleted from the database
    const deletedIngredient = await Ingredients.findById(existingIngredient._id)
    expect(deletedIngredient).toBeNull()
  })
})
