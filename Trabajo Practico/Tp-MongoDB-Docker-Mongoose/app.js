const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes/userRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL, {})

const app = express();
app.use(bodyParser.json());

app.use("/usuario", router);  // Rutas registradas correctamente

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});