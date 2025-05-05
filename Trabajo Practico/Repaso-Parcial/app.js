const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

config();

const projectsRoutes = require("./src/routes/projects");

const researchersRoutes = require("./src/routes/researchers");

const publicationsRoutes = require("./src/routes/publications");

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });

app.use("/projects", projectsRoutes);
app.use("/publications", publicationsRoutes);
app.use("/researchers", researchersRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
