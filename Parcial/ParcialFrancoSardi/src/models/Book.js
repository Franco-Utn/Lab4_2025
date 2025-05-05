
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({ 
    titulo: {type: String, required: true}, 
    resumen: {type: String}, 
    genero: {type: String, required: true}, 
    publicacion: {type: Date, required: true}, 
    disponible: {type: Boolean, required: true}, 
}); 

module.exports = mongoose.model("books", BookSchema);