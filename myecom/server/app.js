const express = require("express");
const cors = require("cors");

const path = require("path")

require("dotenv").config();

const logger = require("./middleware/logger");

const userRoute = require("./routes/users");
const cartRoute = require("./routes/cart")
const productRoute = require("./routes/products");
const verifyUser = require("./middleware/auth.middleware");

require("./db/connections");

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(logger);

app.use(cors()); // CORS issue fix

app.use("/user", userRoute);

app.use("/product", verifyUser, productRoute);

app.use("/cart", verifyUser, cartRoute)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
