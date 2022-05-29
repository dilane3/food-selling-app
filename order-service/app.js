import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { createConnection } from './db.js'
import Order from './Order.js'
import mongoose from 'mongoose'
import { getUser } from './api/user.js'
import { getFood } from './api/food.js'

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


// API gateways

/**
 * Create a new order
 */
app.post("/orders", async (req, res) => {
  const {
    userId,
    foodId,
    initialDate,
    deliveryDate
  } = req.body

  if (userId && foodId && initialDate) {
    try {
      const order = new Order({
        userId: mongoose.Types.ObjectId(userId),
        foodId: mongoose.Types.ObjectId(foodId),
        initialDate: new Date(initialDate),
        deliveryDate: deliveryDate && new Date(deliveryDate)
      })

      await order.save()

      return res.status(201).json({ data: order })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  return res.status(400).json({ message: "Provide all the required data" })
})

app.get("/orders", async (req, res) => {
  try { 
    const orders = await Order.find()

    const fullOrders = []

    for (let order of orders) {
      const { data: user } = await getUser(order.userId)
      const { data: food } = await getFood(order.foodId)

      fullOrders.push({
        ...order._doc,
        user,
        food,
        userId: undefined,
        foodId: undefined
      })
    }

    return res.json({ data: fullOrders })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ error: "Something went wrong" })
  }
})

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try {
      const order = await Order.findById(id)

      if (order) {
        // Get user and food information
        const { data: user } = await getUser(order.userId)
        const { data: food } = await getFood(order.foodId)
  
        const fullOrder = { 
          ...order._doc, 
          user, 
          food, 
          userId: undefined, 
          foodId: undefined 
        }
  
        return res.json({ data: fullOrder })
      }

      return res.status(404).json({ error: "Order not found" })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }
  
  return res.status(400).json({ error: "Provide an id" })
})

app.delete("/orders/:id", async (req, res) => {
  const { id } = req.params

  if (id) {
    try {
      await Order.findByIdAndRemove(id)

      return res.json({ data: "Order deleted successfully" })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Something went wrong" })
    }
  }
  
  return res.status(400).json({ error: "Provide an id" })
})


app.listen(PORT, () => {
  console.log(`Server up and running on localhost:${PORT}`)
  
  createConnection()
})