const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Usuario = new Schema({
    correo: String,
    clave: String,
    nombre: String,
    pais: String,
    area: String,
    titulos: Array,    
    lenguajes: Array,
    idiomas: [{
        idioma: String,
        nivel: String
    }],
    rol: String
});

module.exports = mongoose.model('Model', Usuario,'Usuario');