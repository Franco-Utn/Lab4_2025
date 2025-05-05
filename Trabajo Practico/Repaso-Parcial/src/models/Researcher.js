const mongoose = require('mongoose');

const ResearcherScheme = new mongoose.Schema({
    nombre: {type: String, required: true},
    especialidad: String,
    email: {type: String, unique: true, required: true},
    proyectos: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Project"}
    ]
})

module.exports = mongoose.model("Researcher", ResearcherScheme)