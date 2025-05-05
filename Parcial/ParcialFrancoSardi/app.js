const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

config();

const booksRoutes = require("./src/routes/books");

const authorsRoutes = require("./src/routes/authors");


const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
