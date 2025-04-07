const mongoose =require('mongoose');
const user = mongoose.Schema({
    nombre: {type: String, require},
    apellido: String,
    edad: Number,
})

module.exports = mongoose.model('User', user)
