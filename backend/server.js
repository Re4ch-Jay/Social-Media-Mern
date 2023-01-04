require('dotenv').config()
const express = require("express")
const app = express()
require('./dbConfig')

app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Sever is running on port ${process.env.PORT}`)
})

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)