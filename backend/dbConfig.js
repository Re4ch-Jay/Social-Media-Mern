const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI).then(res => {
    console.log("Connected to db")
})
.catch(err => {
    console.log(err)
})
