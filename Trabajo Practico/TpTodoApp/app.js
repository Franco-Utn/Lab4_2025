const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {config} = require("dotenv");
config();

const taskRoutes = require ("./src/routes/task.routes");
const sprintRoutes = require ("./src/routes/sprint.routes");
const backlogRoutes = require ("./src/routes/backlog.routes");


//Usameos Express para los middlewares
const app = express();
app.use(bodyParser.json()); //Parseador de Bodies

//COnectamos la Base de Datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.DB_NAME}) 
const db = mongoose.connection;

app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);


const port = process.env.PORT || 3001

app.listen (port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})