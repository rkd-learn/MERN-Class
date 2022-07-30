const express = require("express");

require("dotenv").config()

const logger = require("./middleware/logger")
const userRoute = require("./routes/users")

require("./db/connections")

const app = express()

const PORT = process.env.APP_PORT || 3000

app.use(express.json())

app.use(logger)

app.use("/user",userRoute)

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})