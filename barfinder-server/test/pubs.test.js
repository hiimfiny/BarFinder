/* const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../server")
const Pubs = require("../models/pub_model")

describe("Pubs API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  beforeEach(async () => {
    await Pubs.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test("GET /pubs should return all pubs", async () => {
    const response = await request(app).get("/pubs")
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test("POST /pubs/add should add a new pub", async () => {
    const newPub = {
      _id: "1",
      name: "The Happy Pub",
      address: "123 Pub Street",
      location: "Somewhere City",
      ratings: [4, 5, 3],
      menu: ["Beer", "Wine", "Whiskey"],
      opentime: "10:00 AM - 10:00 PM",
    }

    const response = await request(app).post("/pubs/add").send(newPub)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Pub added")
  })

  test("DELETE /pubs/:id should delete a pub by id", async () => {
    const pub = new Pubs({
      _id: "1",
      name: "The Happy Pub",
      address: "123 Pub Street",
      location: "Somewhere City",
      ratings: [4, 5, 3],
      menu: ["Beer", "Wine", "Whiskey"],
      opentime: "10:00 AM - 10:00 PM",
    })

    await pub.save()
    const response = await request(app).delete(`/pubs/${pub._id}`)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Pub deleted")
  })

  test("POST /pubs/update-rating/:id should update a pub rating", async () => {
    const pub = new Pubs({
      _id: "1",
      name: "The Happy Pub",
      address: "123 Pub Street",
      location: "Somewhere City",
      ratings: [4, 5, 3],
      menu: ["Beer", "Wine", "Whiskey"],
      opentime: "10:00 AM - 10:00 PM",
    })

    await pub.save()

    const updatedRatings = [5, 4, 4]

    const response = await request(app)
      .post(`/pubs/update-rating/${pub._id}`)
      .send(updatedRatings)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Pub updated!")

    const updatedPub = await Pubs.findById(pub._id)
    expect(updatedPub.ratings).toEqual(updatedRatings)
  })

  test("POST /pubs/update/:id should update an existing pub", async () => {
    const pub = new Pubs({
      _id: "1",
      name: "The Happy Pub",
      address: "123 Pub Street",
      location: "Somewhere City",
      ratings: [4, 5, 3],
      menu: ["Beer", "Wine", "Whiskey"],
      opentime: "10:00 AM - 10:00 PM",
    })

    await pub.save()

    const updatedPubDetails = {
      name: "The Happiest Pub",
      address: "124 Pub Street",
      location: "Anywhere City",
      menu: ["Beer", "Wine", "Whiskey", "Vodka"],
      opentime: "12:00 PM - 12:00 AM",
    }

    const response = await request(app)
      .post(`/pubs/update/${pub._id}`)
      .send(updatedPubDetails)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Pub updated!")

    const updatedPub = await Pubs.findById(pub._id)
    expect(updatedPub.name).toBe(updatedPubDetails.name)
    expect(updatedPub.address).toBe(updatedPubDetails.address)
    expect(updatedPub.location).toBe(updatedPubDetails.location)
    expect(updatedPub.menu).toEqual(updatedPubDetails.menu)
    expect(updatedPub.opentime).toBe(updatedPubDetails.opentime)
  })
})
 */
