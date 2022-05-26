import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { createConnection } from './db.js'
import User from './User.js'

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
 * Create a new user
 */
app.post("/users", async (req, res) => {
  const {
    name,
    age
  } = req.body

  if (name && age) {
    try {
      // Prepare the creation of a new user
      const user = new User(req.body)

      await user.save()

      return res.status(201).json({ data: user })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  } else {
    res.status(400).json({ error: "Provide all the required data" })
  }
})

/**
 * Find all users
 */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find()

    return res.json({ data: users })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ error: "Something went wrong" })
  }
})

/**
 * Find a user by his id
 */
 app.get("/users/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try {
      const user = await User.findById(id)
  
      return res.json({ data: user })
    } catch (err) {
      console.log(err)
  
      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  return res.status(400).json({ error: "Provide all the required data" })
})

/**
 * Delete a user
 */
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try {
      await User.findByIdAndDelete(id)

      return res.json({ data: "User successfully deleted" })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  } 

  return res.status(400).json({ error: "Provide all the required data" })
})



app.listen(PORT, () => {
  console.log(`Server up and running on localhost:${PORT}`)

  createConnection()
})