const bodyParser = require("body-parser");
const express = require("express");
const router = require("./userRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connnct(process.env.DB_URL,{})


const app = express();
app.use(bodyParser.json());

app.use("/user", router);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
