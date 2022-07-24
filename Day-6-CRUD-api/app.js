const express = require("express");

require("dotenv").config()

const Logger = require("./middleware/logger")

require("./db/connection")

const productRoutes = require("./routes/product")

const app = express();

app.use(express.json())

const port = process.env.APP_PORT || 3000;

app.use(Logger)

app.use("/product", productRoutes);

app.listen(port,()=>{
    console.log(`app is running on Port ${port}`)
});


