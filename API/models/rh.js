const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Usuario_RH = new Schema({
    usuario: String,
    clave: String
});

module.exports = mongoose.model('Model1', Usuario_RH, 'Usuarios_RH' );//,'Usuarios_RH');