const express = require('express')
const daoObjetos = require('../dao/daoObjetos')
const rtMain = express.Router()
const Objeto = require ('../models/Objeto')

//aqui te creas las rutas get, post, etc.. que necesies

rtMain.get('/', function (req, res) {
    res.render('home')
})

module.exports=rtMain