import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

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

app.get("/", (req, res) => res.send("Food microsevice"))

app.listen(PORT, () => console.log(`Server up and running on localhost:${PORT}`))