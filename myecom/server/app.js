const express = require("express");
const cors = require("cors");

require("dotenv").config();

const logger = require("./middleware/logger");

const userRoute = require("./routes/users");
const cartRoute = require("./routes/cart")
const productRoute = require("./routes/products");
const verifyUser = require("./middleware/auth.middleware");

require("./db/connections");

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use(logger);

app.use(cors()); // CORS issue fix

app.use("/user", userRoute);
app.use("/product", productRoute);

app.use("/cart", cartRoute)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
