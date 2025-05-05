const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    nombre: {type:String, required: true},


    bio: String, 


    fechaNacimiento: {type:Date, required: true},


    nacionalidad: {type:String, required: true},


    libros:[{type: mongoose.Schema.Types.ObjectId, ref: 'books'}],
})

module.exports = mongoose.model("authors", AuthorSchema);