const express = require("express");
const path = require("path");

const orderRoute = require("./routes/order");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/order", orderRoute)

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
})

