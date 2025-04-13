const mongoose =require('mongoose');
const usuario = mongoose.Schema({
    nombre: {type: String, require},
    email: String,
    edad: Number,
})

module.exports = mongoose.model('Usuario', usuario)
