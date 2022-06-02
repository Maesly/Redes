const Usuario_rh = require('../models/rh')
const express = require('express')
const router = express.Router()


router.get('/:usuario/:clave', async (req, res) =>{
    try{
        const usuarios = await Usuario_rh.find({'usuario': req.params.usuario, 'clave': req.params.clave}).count() > 0 ? true : false
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router