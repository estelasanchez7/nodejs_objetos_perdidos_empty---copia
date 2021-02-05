const express = require('express')
const rtPrivado = express.Router()
//const session = require('express-session')

rtPrivado.get('/objetos/nuevo', function (req, res) {
    req.session.usuario == true
    res.locals.session = req.session
    if (req.session.autenticado == true)
        res.render('objetos/formulario')
    else
        res.render('usuarios/login')
})

rtPrivado.get('/usuarios/unlogin', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = rtPrivado