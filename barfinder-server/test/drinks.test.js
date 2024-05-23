const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../server")
const Drinks = require("../models/drink_model")

describe("Drinks API", () => {
  beforeAll(async () => {
    // Connect to MongoDB before running tests
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
  })

  beforeEach(async () => {
    await Drinks.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test("GET /drinks should return all drinks", async () => {
    const response = await request(app).get("/drinks")
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test("POST /drinks/add should add a new drink", async () => {
    const newDrink = {
      name: "Mojito",
      type: "Cocktail",
      ingredients: ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
      glass: "Highball glass",
      img: "some_image_url",
    }

    const response = await request(app).post("/drinks/add").send(newDrink)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Drink added")
  })

  test("DELETE /drinks/:id should delete a drink by id", async () => {
    const existingDrink = await Drinks.create({
      name: "Mojito",
      type: "Cocktail",
      ingredients: ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
      glass: "Highball glass",
      img: "some_image_url",
    })

    const response = await request(app).delete(`/drinks/${existingDrink._id}`)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Drink deleted")

    // Check if the drink was deleted from the database
    const deletedDrink = await Drinks.findById(existingDrink._id)
    expect(deletedDrink).toBeNull()
  })

  test("POST /drinks/update/:id should update an existing drink", async () => {
    const drink = new Drinks({
      _id: "1",
      name: "Mojito",
      type: "Cocktail",
      ingredients: ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
      glass: "Highball glass",
      img: "some_image_url",
    })

    await drink.save()

    const updatedDrink = {
      _id: "1" /*  */,
      name: "Updated Mojito",
      type: "Updated Cocktail",
      ingredients: ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
      glass: "Highball glass",
      img: "updated_image_url",
    }

    const response = await request(app)
      .post(`/drinks/update/${drink._id}`)
      .send(updatedDrink)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Drink updated!")
  })
})
