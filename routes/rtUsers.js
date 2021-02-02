const express = require('express')
const rtUsers = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuario')

rtUsers.get('/nuevo',(req,res)=>{
    res.render('usuarios/formulario')
})

rtUsers.post('/guardar', (req,res)=>{
    daoUsuarios.guardar(req.body)
    res.render('usuarios/formulario',{mensaje:"Usuario guardado correctamente. Revise su email para activar su cuenta."})
})

rtUsers.get('/comprobar/:pwd',async (req,res)=>{
    let pwd=req.params.pwd
    let u = await daoUsuarios.getUsuarioByEmail('sagatzt@gmail.com')
    res.send("La comparación salió: " + await u.comprobarPwd(pwd))
})

module.exports=rtUsers