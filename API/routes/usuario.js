const Usuario = require('../models/usuario')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) =>{
    try{
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Consulta 1: Mostrar el nombre completo de las personas que son del área de TI
router.all('/buscar_ti', async (req, res) =>{
    try{
        const usuarios = await Usuario.find({'area':'TI'})
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Consulta 2: Mostrar el nombre completo y país de residencia de las personas que hablan inglés avanzado
router.all('/ingles_avanzado', async (req, res) =>{
    try{
        const usuarios = await Usuario.find({'idiomas.idioma':'Ingles', 'idiomas.nivel':'Avanzado'})
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Consulta 3: Mostrar el nombre completo, títulos de las personas que no son del área de TI.
router.all('/buscar_no_ti', async (req, res) =>{
    try{
        const usuarios = await Usuario.find({'area':{$ne:'TI'}, 'rol':'Usuario'})
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Buscar si el usuario existe y coincide la clave 
router.get('/:correo/:clave', async (req, res) =>{
    try{
        
        const usuarios = await Usuario.find({'correo': req.params.correo, 'clave': req.params.clave}).count() > 0 ? true : false
        const rol = await Usuario.find({'correo': req.params.correo, 'rol': 'Administrador'}).count() > 0 ? true : false     
        //var rol2 = JSON.parse(rol)
        //const user = await Usuario.find({'usuario': req.params.correo, 'clave': req.params.clave}).count() > 0 ? true : false
        if(usuarios == true && rol == true){
            return res.json(true)
        }
        if(usuarios == true && rol == false){
            return res.json(false)
        }
        if(rol != 'Administrador' || rol != 'Usuario'){
            return res.status(404).json({message: 'No se encontro Usuario'})
        }
        //console.log(usuarios)
        //res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getUsuario, (req, res) =>{
    res.json(res.usuario)
})

async function getUsuario(req, res, next){
    let usuario
    try{
        usuario = await Usuario.findById(req.params.id)
        if(usuario == null){
            return res.status(404).json({message: 'No se encontro Usuario'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.usuario = usuario
    next()
}

router.post('/', async (req, res) =>{
    const usuario = new Usuario({
        correo: req.body.correo,
        clave: req.body.clave,
        nombre: req.body.nombre,
        pais: req.body.pais,
        area: req.body.area,
        titulos: req.body.titulos,    
        lenguajes: req.body.lenguajes,
        idiomas: req.body.idiomas,
        rol: req.body.rol,
    })
    try{
        const newUsuario = await usuario.save()
        res.status(201).json(newUsuario)
    }catch(err){
        res.status(400).json({message: message.err})
    }
    
})

//Update de alguna dato para un ID de Usuario
router.patch('/:id', getUsuario, async (req, res) =>{
    if(req.body.correo != null){
        res.usuario.correo = req.body.correo
    }
    if(req.body.clave != null){
        res.usuario.clave = req.body.clave
    }
    if(req.body.nombre != null){
        res.usuario.nombre = req.body.nombre
    }
    if(req.body.pais != null){
        res.usuario.pais = req.body.pais
    }
    if(req.body.area != null){
        res.usuario.area = req.body.area
    }
    if(req.body.titulos != null){
        res.usuario.titulos = req.body.titulos
    }
    if(req.body.lenguajes != null){
        res.usuario.lenguajes = req.body.lenguajes
    }
    if(req.body.idiomas != null){
        res.usuario.idiomas = req.body.idiomas
    }
    try{
        const updateUsuario = await res.usuario.save()
        res.json(updateUsuario)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete un Usuario por ID  
router.delete('/:id', getUsuario, async (req, res) =>{
    try{
        await res.usuario.remove()
        res.json({message: 'Usuario Eliminado'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})



module.exports = router