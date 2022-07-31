const express = require("express");

require("dotenv").config();

const logger = require("./middleware/logger");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart")

require("./db/connections");

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use(logger);

app.use("/user", userRoute);
app.use("/product", productRoute);

app.use("/cart",cartRoute)


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
