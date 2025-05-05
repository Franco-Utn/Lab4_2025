const mongoose = require("mongoose")

const PublicationSchema = new mongoose.Schema ({
    titulo: {type : String, required: true},
    resumen: String,
    fechaPublicacion: {type: Date, required: true},
    proyectoRelacionado: {type:mongoose.Schema.Types.ObjectId, ref: "Project"},
    autores:[
        {type: mongoose.Schema.Types.ObjectId, ref: "Researcher"}
    ]
})

module.exports = mongoose.model("Publication", PublicationSchema)