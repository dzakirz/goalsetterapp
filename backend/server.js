const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const colors = require('colors')
const { errorHandler } = require('./middlewares/errorMiddleaware.js')
const connectDB = require('./config/db.js')

const port = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`running on http://localhost:${port}`)
})