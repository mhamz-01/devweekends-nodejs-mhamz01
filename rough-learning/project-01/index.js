const express = require('express')
const users = require('./data.json')
const fs= require('fs')
const app = express()
const port =8000
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const userSchema = require('./models/user')
const connectDB = require('./connection')
const middleware = require('./middleware')
const { type } = require('os')
const connectDB = require('./connection')








const User= mongoose.model('user', userSchema)

// Middleware plugin
app.use(express.urlencoded({ extended: false }))


connectDB("mongodb://127.0.0.1:27017/youtube-app-1");

// This version stops from moving forward if api is called

// app.use((req, res, next) => {
//     console.log("middleware 1")
//     return res.json({"message": "middleware 1"})
// })

// app.use((req, res, next) => {
//     console.log("middleware 1")
//     next();
// })


app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

