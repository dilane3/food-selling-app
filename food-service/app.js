import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { createConnection } from './db.js'
import Food from './Food.js'

// Fetch data from .env file
config()

const { PORT } = process.env

// Cors handling
const corsOption = {
  origin: "*"
}

// New instance of express app
const app = express()

// Middleware section
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Gateways

/**
 * Create a new food
 */
app.post("/foods", async (req, res) => {
  const {
    title,
    author
  } = req.body

  if (title && author) {
    try {
      const food = new Food(req.body)

      await food.save()

      return res.status(201).json({ data: food })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  return res.status(400).json({ error: "Provide all the required data" })
})

/**
 * Get all foods
 */
app.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find()

    return res.json({ data: foods })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ error: "Something went wrong" })
  }
})

/**
 * Get a single food
 */
app.get("/foods/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try { 
      const food = await Food.findById(id)

      return res.json({ data: food })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  return res.status(400).json({ error: "Provide an id of the food" })
})

/**
 * Delete a specific food
 */
app.delete("/foods/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try { 
      await Food.findByIdAndDelete(id)

      return res.json({ data: "Food successfully deleted" })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  return res.status(400).json({ error: "Provide an id of the food" })
})



app.listen(PORT, () => {
  console.log(`Server up and running on localhost:${PORT}`)
  
  // Create connexion with the database
  createConnection()
})