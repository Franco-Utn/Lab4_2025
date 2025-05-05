const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema ({
    nombre: {type : String, required: true},
    descripcion: String, 
    fechaInicio: {type: Date, required: true},
    fechaFinalizacion: Date,
    estado: {type: String, enum: ["propuesta", "en curso", "finalizado"]},
    investigadores:[
        {type: mongoose.Schema.Types.ObjectId, ref: "Researcher"}
    ]
})
module.exports = mongoose.model("Project", projectSchema)
