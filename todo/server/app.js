const express = require("express");
const cors = require('cors')

require("dotenv").config();

const logger = require("./middleware/logger");
const todoRoute = require("./routes/todo");

require("./db/connections");

const app = express();

app.use(cors())

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use(logger);

app.use("/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
